import {
    Request, Response, Router
} from "express";
import {
    successHandler, errorHandler
} from "package.breezebd.com";
import { Product } from "../models/Produt";

const router = Router();

router.get("/api/business/product/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ id }).populate(
            "shopId productId productImgUri productPrice productPublishTime productPublisher productAvailability quantity"
        );
        if (product) {
            return successHandler(res, 200, product);
        };
    } catch (error) {
        return errorHandler(res, 500, "Business server error...");
    };
});

export { router as getProductRouter }