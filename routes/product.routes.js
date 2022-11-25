import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
    addProduct,
    deleteProduct,
    updateProduct,
} from "../controllers/product.controllers.js";

const router = express.Router();

// add a product
router.post("/add", addProduct);

// update a product
router.put("/update/:id", verifyToken, updateProduct);

// update a product
router.delete("/delete/:id", verifyToken, deleteProduct);

export default router;
