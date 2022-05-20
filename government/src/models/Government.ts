import {
    model, Schema, Model, Document
} from "mongoose";

interface GovernmentInterface {
    countryName?: string;
    countryCode?: string;
    countryRules?: object;
}

interface GovernmentRulesDoc extends Document {
    countryName?: string;
    countryCode?: string;
    countryRules?: object;
}

interface UseGovernmentInterface extends Model<GovernmentRulesDoc> {
    build(arrts: GovernmentInterface): GovernmentRulesDoc;
};

// Shop app MongoDB schema for database fields
const GovernmentSchema = new Schema(
    {
        countryName: {
            trim: true,
            type: String,
            required: true,
        },
        countryCode: {
            trim: true,
            type: String
        },
        countryRules: {
            trim: true,
            type: Object,
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
GovernmentSchema.statics.build = (attrs: GovernmentInterface) => {
    return new Government(attrs);
};

const Government = model<GovernmentRulesDoc, UseGovernmentInterface>("Government", GovernmentSchema);

export { Government }