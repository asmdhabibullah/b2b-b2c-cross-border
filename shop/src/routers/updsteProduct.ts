import {
    Request, Response, Router
} from "express";
import {
    successHandler, errorHandler
} from "package.breezebd.com";
import { Product } from "../models/Produt";

const router = Router();

router.put("/api/business/product/update", async (req: Request, res: Response) => {
    try {
        const {
            id,
            employ,
            shopId,
            productName,
            productImgUri,
            productPrice,
            productDiscount,
            productPublisher,
            quantity
        } = req.body;

        if (employ.employPermissionType === "SHOP_OWNER" || employ.employPermissionType === "SHOP_ADMIN" || employ.employPermissionType === "SHOP_EMPLOY") {
            Product.findOne({ id }, async (err: any, product: any) => {
                if (!err && product) {
                    product.shopId = shopId;
                    product.productName = productName;
                    product.productImgUri = productImgUri;
                    product.productPrice = productPrice;
                    product.productDiscount = productDiscount;
                    product.productPublishTime = new Date()
                    product.productPublisher = productPublisher;
                    product.quantity = quantity;
                    await product.save();
                    return successHandler(res, 201, "Product added...");
                } else {
                    return errorHandler(res, 404, "Product not found...");
                }
            })

        } else {
            return errorHandler(res, 400, "You don't have permission to add new product...");
        }
    } catch (error) {
        return errorHandler(res, 500, "Business server error...");
    }
});

export { router as updateProductRouter }