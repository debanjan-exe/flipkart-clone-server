import { createError } from "../error.js";
import Product from "../models/product.model.js";

export const addProduct = async (req, res, next) => {
    const newProduct = new Product(req.body);
    try {
        await newProduct.save();
        res.status(200).json("Product added successfully");
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return next(createError(404, "product not found"));
        if (req.user.id === product.userId) {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedProduct);
        } else {
            return next(createError(403, "You can update only your product"));
        }
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return next(createError(404, "Product not found"));
        if (req.user.id === product.userId) {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Product has been deleted !");
        } else {
            return next(createError(403, "You can delete only your product"));
        }
    } catch (err) {
        next(err);
    }
};
