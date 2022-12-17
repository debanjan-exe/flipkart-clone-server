import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        userImg: {
            type: String,
            default:
                "https://res.cloudinary.com/debanjan/image/upload/v1645795943/account_vrj23k.png",
        },
        cart: {
            type: [String],
            default: [],
        },
        products: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
