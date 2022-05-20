import { successHandler } from 'package.breezebd.com';
import { errorHandler } from 'package.breezebd.com';
import express, { Request, Response } from "express";
import { Government } from '../models/Government';

const router = express.Router();

router.get("/api/government/rules/create", async (req: Request, res: Response) => {
    try {
        const { name, code, rules } = req.body;
        const government = Government.build({
            countryName: name,
            countryCode: code,
            countryRules: rules
        });

        // await Government.findOne({ id }, (err: any, Government: any) => {
        //     if (!err && Government) {
        //     }
        // })

        await government.save();

        return successHandler(res, 200, "Create Gov. rules request accepted...");
    } catch (error) {
        return errorHandler(res, 500, "Gov. rules app server error...");
    }
});

// router.delete("/api/order/calcel/:id", async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         await Government.findOneAndDelete({ id }, (err: any, done: any) => {
//             if (!err && done) {
//                 return successHandler(res, 200, "Order cancel request accepted...");
//             }
//         })
//     } catch (error) {
//         return errorHandler(res, 500, "Order server error...")
//     }
// });

export { router as govRulesCreateRoute }