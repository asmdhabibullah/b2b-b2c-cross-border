import {
    Router, Request, Response
} from "express";
import {
    body
} from "express-validator";
import {
    errorHandler, successHandler, validateRequest
} from "package.breezebd.com";
import { Auth, AuthDoc } from "../models/Auth";

const router = Router();

router.post(
    "/api/auth/user/delete",
    [
        body('email').isEmail().withMessage('Email must be valid')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            await Auth.findOne({ email }, async (err: any, user: AuthDoc) => {
                if (!err && user) {
                    const userDeleted = await Auth.findOneAndDelete({ email });
                    if (userDeleted) {
                        return successHandler(res, 200, "User deleted...");
                    } else {
                        return errorHandler(res, 404, "User not found...");
                    }
                }
                return errorHandler(res, 404, "User not found...");
            })
        } catch (error) {
            return errorHandler(res, 500, "Auth server error...");
        }
    });

export { router as deleteUserRouter }