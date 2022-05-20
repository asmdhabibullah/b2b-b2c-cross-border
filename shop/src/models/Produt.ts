import {
    model, Schema, Model, Document
} from "mongoose";
// import { Password } from "../service/password";

interface ProductInterface {
    shopId?: string;
    productName?: string;
    productImgUri?: string;
    productDescripton?: string;
    productPrice?: number;
    productDiscount?: number;
    productPromoCode?: string;
    productPublishTime?: Date;
    productPublisher?: string;
    quantity?: number;
}

interface ProductDoc extends Document {
    shopId?: string;
    productName?: string;
    productImgUri?: string;
    productDescripton?: string;
    productPrice?: number;
    productDiscount?: number;
    productPromoCode?: string;
    productPublishTime?: Date;
    productPublisher?: string;
    quantity?: number;
}

interface UseProductInterface extends Model<ProductDoc> {
    build(arrts: ProductInterface): ProductDoc;
};

// Shop app MongoDB schema for database fields
const ProductSchema = new Schema(
    {
        shopId: {
            type: Schema.Types.ObjectId,
            ref: "Account",
        },
        productImgUri: {
            type: String,
            trim: true,
            required: true,
        },
        productPrice: {
            trim: true,
            type: Number,
            required: true,
        },
        productDescripton: {
            type: String,
            trim: true,
            required: true,
        },
        productQrCode: {
            type: String,
            trim: true,
            required: true,
        },
        productDiscount: {
            type: Number,
            trim: true,
            required: true,
        },
        productPromoCode: {
            type: String,
            trim: true,
            required: true,
        },
        productPublishTime: {
            type: Date,
            required: true,
        },
        productPublisher: {
            type: String,
            trim: true,
            required: true,
        },
        productAvailability: {
            type: Boolean,
            default: true
        },
        quantity: {
            trim: true,
            type: Number,
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

// Better way to approch
ProductSchema.statics.build = (attrs: ProductInterface) => {
    return new Product(attrs);
};

const Product = model<ProductDoc, UseProductInterface>("Product", ProductSchema);

export { Product }