import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
    addProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from "../controllers/product.controllers.js";

const router = express.Router();

// get All Products
router.get("/", getAllProducts)

// get product by Id
router.get("/:id", getProductById)

// add a product
router.post("/", verifyToken, addProduct);

// update a product
router.put("/:id", verifyToken, updateProduct);

// update a product
router.delete("/:id", verifyToken, deleteProduct);

export default router;
