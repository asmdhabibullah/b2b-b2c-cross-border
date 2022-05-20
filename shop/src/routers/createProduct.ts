import {
    Request, Response, Router
} from "express";
import {
    successHandler, errorHandler
} from "package.breezebd.com";
import { Product } from "../models/Produt";

const router = Router();

router.post("/api/business/product/create", async (req: Request, res: Response) => {
    try {
        const {
            employ,
            shopId,
            productName,
            productImgUri,
            productPrice,
            productDescripton,
            productDiscount,
            productPublisher,
            quantity
        } = req.body;

        if (employ.employPermissionType === "SHOP_OWNER" || employ.employPermissionType === "SHOP_ADMIN" || employ.employPermissionType === "SHOP_EMPLOY") {
            const product = Product.build({
                shopId,
                productName,
                productImgUri,
                productPrice,
                productDiscount,
                productDescripton,
                productPublishTime: new Date(),
                productPublisher,
                quantity
            });
            await product.save();
            return successHandler(res, 201, "Product added...");
        } else {
            return errorHandler(res, 400, "You don't have permission to add new product...");
        }
    } catch (error) {
        return errorHandler(res, 500, "Business server error...");
    }
});


export { router as createProductRouter };