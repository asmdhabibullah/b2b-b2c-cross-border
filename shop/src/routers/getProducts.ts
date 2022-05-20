import {
    Request, Response, Router
} from "express";
import {
    successHandler, errorHandler
} from "package.breezebd.com";
import { Shop, ShopDoc } from "../models/Account";
import { Product } from "../models/Produt";

const router = Router();

router.get("/api/business/products", async (req: Request, res: Response) => {
    try {
        const products = await Product.find({}).populate(
            "shopId productId productImgUri productPrice productPublishTime productPublisher productAvailability quantity"
        );
        if (products.length > 0) {
            return successHandler(res, 200, products);
        };
    } catch (error) {
        return errorHandler(res, 500, "Business server error...");
    };
});


export { router as getProductsRouter }