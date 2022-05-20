import {
    model, Schema, Model, Document
} from "mongoose";
// import { Password } from "../service/password";

interface ShopInterface {
    userId?: string;
    shopId?: string;
    ownerName?: string;
    shopLicense?: {
        number?: string;
        providedCoundtry?: string;
    };
    products?: [
        {
            productId?: Schema.Types.ObjectId
        }
    ];
}

export interface ShopDoc extends Document {
    userId?: string;
    shopId?: string;
    ownerName?: string;
    shopLicense?: {
        number?: string;
        providedCoundtry?: string;
    };
    products?: [
        {
            productId?: Schema.Types.ObjectId,
        }
    ];

}

interface UseShopInterface extends Model<ShopDoc> {
    build(arrts: ShopInterface): ShopDoc;
};

// Shop app MongoDB schema for database fields
const ShopSchema = new Schema(
    {
        userId: {
            trim: true,
            type: String,
            required: true,
        },
        shopId: {
            trim: true,
            type: String,
            required: true,
        },
        ownerName: {
            trim: true,
            type: String,
            required: true,
        },
        shopLicense: {
            number: {
                trim: true,
                type: String,
                required: true,

            },
            providedCoundtry: {
                trim: true,
                type: String,
                required: true,
            },
        },
        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                }
            }

        ],
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
ShopSchema.statics.build = (attrs: ShopInterface) => {
    return new Shop(attrs);
};

const Shop = model<ShopDoc, UseShopInterface>("Shop", ShopSchema);

export { Shop }