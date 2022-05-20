import {
    model, Schema, Model, Document, Date
} from "mongoose";

interface OrderdProductInterface {
    client?: {
        name?: string;
        country?: string;
        pnoneNumber?: string;
    };
    product?: {
        shopId?: string;
        productId?: string;
        productName?: string;
        productImgUri: string;
        productPrice: number;
        productDescripton: string;
    };
   deliverCountry: string;
   deliverAddress: string;
}

interface OrderProductDoc extends Document {
    client?: {
        name?: string;
        country?: string;
        pnoneNumber?: string;
    };
    product?: {
        shopId?: string;
        productId?: string;
        productName?: string;
        productImgUri: string;
        productPrice: number;
        productDescripton: string;
    };
   deliverCountry: string;
   deliverAddress: string;
}

interface UseOrderdProductInterface extends Model<OrderProductDoc> {
    build(arrts: OrderdProductInterface): OrderProductDoc;
};

// Shop app MongoDB schema for database fields
const ProductSoldSchema = new Schema(
    {
        client: {
            name: {
                trim: true,
                type: String,
                required: true,
            },
            country: {
                trim: true,
                type: String
            },
            pnoneNumber: {
                trim: true,
                type: String,
                required: true,
            },
        },
        product: {
            shopId: {
                trim: true,
                type: String,
            },
            productId: {
                trim: true,
                type: String,
            },
            productName: {
                trim: true,
                type: String,
            },
            productImgUri: {
                trim: true,
                type: String,
            },
            productPrice: {
                trim: true,
                type: Number,
                required: true,
            },
            productDescripton: {
                trim: true,
                type: String,
            }
        },
       deliverCountry: {
            trim: true,
            type: String,
        },
       deliverAddress: {
            trim: true,
            type: String,
        },
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
ProductSoldSchema.statics.build = (attrs: OrderdProductInterface) => {
    return new Orderd(attrs);
};

const Orderd = model<OrderProductDoc, UseOrderdProductInterface>("Orderd", ProductSoldSchema);

export { Orderd }