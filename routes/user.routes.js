import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
    addToCart,
    removeFromCart,
    updateUser,
} from "../controllers/user.controllers.js";

const router = express.Router();

// update user
router.put("/:id", verifyToken, updateUser);

// add a product to cart
router.put("/addcart/:productId", verifyToken, addToCart);

// remove a product from cart
router.put("/removecart/:productId", verifyToken, removeFromCart);

export default router;
