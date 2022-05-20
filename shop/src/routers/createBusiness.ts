import {
    Request, Response, Router
} from "express";
import {
    successHandler, errorHandler
} from "package.breezebd.com";
import { Shop, ShopDoc } from "../models/Account";

const router = Router();

router.post("/api/business/create", async (req: Request, res: Response) => {
    try {
        const {
            userId, email, firstName, lastName, shopLicenceNumber, shopProvidedCoundtry
        } = req.body;

        const [shopId, _] = email.split("@");

        await Shop.findOne({ shopId }, async (err: any, shop: ShopDoc) => {
            if (!err || err && !shop) {
                const ownerName = `${firstName} ${lastName}`
                const business = Shop.build({
                    userId, shopId, ownerName, shopLicence: {
                        number: shopLicenceNumber,
                        providedCoundtry: shopProvidedCoundtry
                    }
                });
                await business.save();
                return successHandler(res, 201, "Request accepted to create your business account...");
            } else {
                return errorHandler(res, 400, "Request denied, You have already a business account...")
            }
        });
    } catch (error) {
        return errorHandler(res, 500, "Business server error...");
    }
});


export { router as createBusinessRouter };