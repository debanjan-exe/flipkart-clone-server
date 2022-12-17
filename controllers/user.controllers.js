import { createError } from "../error.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
    // Body
    const { password } = req.body;

    // Validation
    // Access-Level Control
    if (req.params.id !== req.user.id)
        next(createError(403, "You can only update your account !"));

    // Stores formatted output
    let result;

    if (password) {
        // Update -> with password
        const userData = await User.findById(req.user.id);

        // Checking whether the current stored password is same as updated password
        const isCorrect = await bcrypt.compare(
            req.body.password,
            userData.password
        );

        if (isCorrect) {
            return next(
                createError(400, "Your updated password is same as before")
            );
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hashedPass = bcrypt.hashSync(req.body.password, salt);

            result = { ...req.body, password: hashedPass };
        }
    } else {
        // Update -> without password
        result = req.body;
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: result,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

export const addToCart = async (req, res, next) => {
    const id = req.user.id;
    const productId = req.params.productId;
    try {
        await User.findByIdAndUpdate(id, {
            $addToSet: { cart: productId },
        });
        res.status(200).json("Added to cart");
    } catch (err) {
        next(err);
    }
};

export const removeFromCart = async (req, res, next) => {
    const id = req.user.id;
    const productId = req.params.productId;
    try {
        await User.findByIdAndUpdate(id, {
            $pull: { cart: productId },
        });
        res.status(200).json("Removed from cart");
    } catch (err) {
        next(err);
    }
};
