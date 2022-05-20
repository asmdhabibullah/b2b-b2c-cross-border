import { successHandler } from 'package.breezebd.com';
import { errorHandler } from 'package.breezebd.com';
import express, { Request, Response } from "express";
import { Government } from '../models/Government';

const router = express.Router();

router.post("/api/government/rules/update/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { rules } = req.body;
        await Government.findOneAndUpdate({ id }, async (err: any, updateGovRules: any) => {
            if (!err && updateGovRules) {
                updateGovRules.countryRules = rules;
                await updateGovRules.save();
                return successHandler(res, 201, "Update Gov. rules request accepted...");
            }
            return errorHandler(res, 500, "Update Gov. rules request denied...");
        })
    } catch (error) {
        return errorHandler(res, 500, "Gov. rules app server error...");
    }
});

export { router as govRulesUpdateRoute }