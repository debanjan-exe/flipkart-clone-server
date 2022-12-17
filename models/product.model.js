import mongoose from "mongoose";

const VariationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        price: {
            type: Number,
        },
        img: {
            type: String,
        },
    },
    { timestamps: true }
);

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        variations: {
            type: [VariationSchema],
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
