import {
    errorHandler, ServerError, successHandler, validateRequest
} from "package.breezebd.com";
import express, {
    Router, Request, Response
} from "express";
import {
    body
} from 'express-validator';
import { Auth } from "../models/Auth";
import { verify } from 'jsonwebtoken';
import { JWT_KEY } from "../config";

const router = Router();

router.post(
    "/api/auth/user/verify",
    [
        body('token').withMessage('Token must be inputed')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { token } = req.headers["Authorization"] || req.body || req.params;
            verify(token, JWT_KEY, async (err: any, decoded: any) => {
                if (!err && decoded) {
                    const { id } = decoded;
                    const userExist = await Auth.findOne({ id });
                    if (!userExist) {
                        return errorHandler(res, 404, "User not found!");
                        // throw new BadRequestError('Invalid credentials');
                    } else {
                        const { id, firstName, lastName, phoneNumber, address } = userExist;
                        return successHandler(res, 200, {
                            id, firstName, lastName, phoneNumber, address, valide: true
                        });
                    }
                } else {
                    return errorHandler(res, 404, "User not verified!");
                }
            });
        } catch (error) {
            throw new ServerError("Auth server error...");
        };

    });

export { router as signinUserRouter }