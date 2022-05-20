import {
    model, Schema, Model, Document
} from "mongoose";

interface TokenInterface {
    token?: string;
    id?: Schema.Types.ObjectId;
}

interface TokenDoc extends Document {
    token?: string;
    id?: Schema.Types.ObjectId;
}

interface TokenInterface extends Model<TokenDoc> {
    build(arrts: TokenInterface): TokenDoc;
};

// Auth Access Token
const TokenSchema = new Schema(
    {
        id: {
            type: Schema.Types.ObjectId,
            ref: "Auth"
        },
        token: {
            type: String,
            trim: true
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            }
        }
    }
);

// Better way to approch
TokenSchema.statics.build = (attrs: TokenInterface) => {
    return new Token(attrs);
}

const Token = model<TokenDoc, TokenInterface>("Token", TokenSchema);

export { Token }