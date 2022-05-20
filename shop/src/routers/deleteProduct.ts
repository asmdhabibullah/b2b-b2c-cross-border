import {
    Request, Response, Router
} from "express";
import {
    successHandler, errorHandler
} from "package.breezebd.com";
import { Product } from "../models/Produt";

const router = Router();

router.delete("/api/business/product/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Product.findOneAndDelete({ id }, (eeeee: any, delDone: any) => {
            if (!eeeee && delDone) {
                return successHandler(res, 200, "Product delete request accepted...");
            } else {
                return errorHandler(res, 404, "Product not found...");
            }
        });
        // const product = await Product.findOne({ id });
        // if (product) {
        // };
    } catch (error) {
        return errorHandler(res, 500, "Business server error...");
    };
});


export { router as deleteProductRouter }