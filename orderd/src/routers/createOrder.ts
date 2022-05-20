import { successHandler } from 'package.breezebd.com';
import { errorHandler } from 'package.breezebd.com';
import express, { Request, Response } from "express";
import { Orderd } from '../models/Ordered';

const router = express.Router();

router.post("/api/order/create", async (req: Request, res: Response) => {
    try {
        const { client, product, deleverCountry, deleverAddress } = req.body;
        if (!client || !product || !deleverAddress || deleverCountry) {
            return errorHandler(res, 400, "You don't have permission to order this product...")
        }
        const orderd = Orderd.build({
            client, product, deleverCountry, deleverAddress
        });
        await orderd.save();
        return successHandler(res, 201, "Order request accepted...");
    } catch (error) {
        return errorHandler(res, 500, "Order server error...")
    }
});

export { router as createOrderRouter }