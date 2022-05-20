import { successHandler } from 'package.breezebd.com';
import { errorHandler } from 'package.breezebd.com';
import express, { Request, Response } from "express";
import { Orderd } from '../models/Ordered';

const router = express.Router();

router.get("/api/order/calcel/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Orderd.findOne({ id }, (err: any, orderd: any) => {
            if (!err && orderd) {
                return successHandler(res, 200, "You requested to cancel order. Are you sure?");
            }
        })
    } catch (error) {
        return errorHandler(res, 500, "Order server error...")
    }
});

router.delete("/api/order/calcel/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Orderd.findOneAndDelete({ id }, (err: any, done: any) => {
            if (!err && done) {
                return successHandler(res, 200, "Order cancel request accepted...");
            }
        })
    } catch (error) {
        return errorHandler(res, 500, "Order server error...")
    }
});


export { router as cancelOrderRouter }