import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    product: {
        type: [mongoose.Types.ObjectId],
    },
    quantity: {
        type: Number,
        default: 1,
    }
});

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
        cart: {
            type: [CartSchema],
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
