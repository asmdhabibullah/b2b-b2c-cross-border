import {
    model, Schema, Model, Document
} from "mongoose";
import { Password } from "../service/password";

// Account type
enum AccountType {
    SYSTEM_ADMIN = "SYSTEM_ADMIN",
    SYSTEM_ACCOUNT = "SYSTEM_ACCOUNT",
    BUSINESS_ACCOUNT = "BUSINESS_ACCOUNT",
    NORMAL_USER_ACCOUNT = "NORMAL_USER_ACCOUNT",
    TRANSPORTATION_ACCOUNT = "TRANSPORTATION_ACCOUNT",
};

// user role
enum EmployRole {
    SHOP_OWNER = "SHOP_OWNER",
    SHOP_ADMIN = "SHOP_ADMIN",
    SHOP_EMPLOY = "SHOP_EMPLOY",
    SHOP_ACCOUNTS = "SHOP_ACCOUNTS",
};

interface AuthInterface {
    firstName: string;
    lastName: string;
    userName?: string;
    email: string;
    password: string;
    phoneNumber: string;
    address?: string;
    accountType?: AccountType;
    employ?: [
        {
            name?: string;
            employEmail: string;
            designation?: string;
            employAddress?: string;
            employPhoneNumber?: string;
            profilePictureUri?: string;
            employPermissionType?: EmployRole;
        }
    ]
}

export interface AuthDoc extends Document {
    firstName: string;
    lastName: string;
    userName?: string;
    email: string;
    password: string;
    phoneNumber: string;
    address?: string;
    accountType?: AccountType;
    employ?: [
        {
            name?: string;
            employEmail: string;
            designation?: string;
            employAddress?: string;
            employPhoneNumber?: string;
            profilePictureUri?: string;
            employPermissionType?: EmployRole;
        }
    ]
}

interface UseAuthInterface extends Model<AuthDoc> {
    build(arrts: AuthInterface): AuthDoc;
};

// Auth app MongoDB schema for database fields
const AuthSchema = new Schema(
    {
        firstName: {
            trim: true,
            type: String,
            required: true,
        },
        lastName: {
            trim: true,
            type: String,
            required: true,
        },
        userName: {
            trim: true,
            type: String
        },
        email: {
            trim: true,
            type: String,
            required: true,
        },
        phoneNumber: {
            trim: true,
            type: String,
            required: true,
        },
        password: {
            trim: true,
            type: String,
            required: true,
        },
        address: {
            trim: true,
            type: String,
        },
        accountType: {
            trim: true,
            type: String,
            enum: AccountType,
            default: AccountType.NORMAL_USER_ACCOUNT
        },
        employ: [
            {
                name: {
                    trim: true,
                    type: String,
                },
                employEmail: {
                    trim: true,
                    type: String,
                },
                designation: {
                    trim: true,
                    type: String,
                },
                employAddress: {
                    trim: true,
                    type: String,
                },
                employPhoneNumber: {
                    trim: true,
                    type: String,
                },
                profilePictureUri: {
                    trim: true,
                    type: String,
                },
                employPermissionType: {
                    trim: true,
                    type: String,
                    default: EmployRole.SHOP_EMPLOY
                }
            }
        ]
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

AuthSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

// Better way to approch
AuthSchema.statics.build = (attrs: AuthInterface) => {
    return new Auth(attrs);
}

const Auth = model<AuthDoc, UseAuthInterface>("Auth", AuthSchema);

export { Auth }