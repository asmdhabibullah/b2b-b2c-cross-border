import { Password } from './../service/password';
import express, {
    Router, Request, Response
} from "express";
import {
    body
} from "express-validator";
import {
    successHandler, errorHandler, validateRequest
} from "package.breezebd.com";
import { Auth } from "../models/Auth";

const router = Router();

router.post(
    "/api/auth/users/update-password",
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('You must supply a password'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await Auth.findOne({ email });
            if (user) {
                const hashPassword = await Password.toHash(password);
                user.password = hashPassword;
                await user.save();
                return successHandler(res, 200, "Password updated...");
            } else {
                return errorHandler(res, 404, "User not found...");
            }
        } catch (error) {
            return errorHandler(res, 500, "Auth server error...");
        }
    });

router.post(
    "/api/auth/users/update-email",
    [
        body().isEmail().withMessage('Email must be valid'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { email, newEmail } = req.body;
            const user = await Auth.findOne({ email });
            if (user) {
                user.email = newEmail;
                await user.save();
                return successHandler(res, 200, "User email updated...");
            } else {
                return errorHandler(res, 404, "User not found...");
            }
        } catch (error) {
            return errorHandler(res, 500, "Auth server error...");
        }
    });

router.post(
    "/api/auth/users/update-username",
    async (req: Request, res: Response) => {
        try {
            const { email, firstName, lastName } = req.body;
            const user = await Auth.findOne({ email });
            if (user) {
                user.firstName = firstName;
                user.lastName = lastName;
                await user.save();
                return successHandler(res, 200, "User updated...");
            } else {
                return errorHandler(res, 404, "User not found...");
            }
        } catch (error) {
            return errorHandler(res, 500, "Auth server error...");
        }
    });

// router.post()
export { router as updateUserRouter }