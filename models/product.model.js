import mongoose from "mongoose";

const RatingReviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            required: true,
            max: 5,
        },
        review: {
            type: String,
            required: true,
        },
    }
);

const ProductSchema = new mongoose.Schema(
    {
        sellerId: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        imgUrl: {
            type: [String],
            default: []
        },
        desc: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        rating: {
            type: [RatingReviewSchema],
            default: []
        },
        availability: {
            type: String,
            enum: ["AVAILABLE", "OUT_OF_STOCK"],
            default: "AVAILABLE"
        }

    },
    { timestamps: true }
);

export default mongoose.model("Product", ProductSchema)
