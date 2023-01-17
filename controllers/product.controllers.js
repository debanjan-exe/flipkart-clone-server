import { createError } from "../error.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      body: products,
    });
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "success",
      body: product,
    });
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res, next) => {
  const sellerId = req.user.id;
  const newProduct = new Product({ ...req.body, sellerId });
  try {
    await newProduct.save();
    res.status(200).json({
      status: "success",
      body: newProduct,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(createError(404, "product not found"));
    if (req.user.id === product.sellerId) {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        status: "success",
        body: updatedProduct,
      });
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
    if (req.user.id === product.sellerId) {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "success",
        body: "Product has been deleted !",
      });
    } else {
      return next(createError(403, "You can delete only your product"));
    }
  } catch (err) {
    next(err);
  }
};
