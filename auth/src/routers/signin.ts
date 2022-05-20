import {
    errorHandler, ServerError, successHandler, validateRequest
} from "package.breezebd.com";
import {
    Router, Request, Response
} from "express";
import { body } from 'express-validator';
import { Password } from './../service/password';
import { Auth } from "../models/Auth";
import { sign } from 'jsonwebtoken';
import { JWT_KEY } from "../config";

const router = Router();

router.post(
    "/api/auth/user/signin",
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            // console.log(req.body);

            const existingUser = await Auth.findOne({ email });
            if (!existingUser) {
                return errorHandler(res, 404, "User not found!");
                // throw new BadRequestError('Invalid credentials');
            }

            const passwordsMatch = await Password.compare(
                existingUser.password!, password
            );

            if (!passwordsMatch) {
                // throw new BadRequestError('');
                return errorHandler(res, 500, "Invalid Credentials!")
            }

            // existingUser.status = true;
            await existingUser.save();
            // Generate JWT
            const userJwt = sign(
                {
                    id: existingUser.id,
                    email: existingUser.email,
                },
                JWT_KEY
            );

            // Store it on session object
            req.session = {
                jwt: userJwt,
            };

            return successHandler(res, 200, existingUser);
        } catch (error) {
            throw new ServerError("Server error!");
        };

    });

export { router as signinUserRouter }