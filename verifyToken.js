import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    // const token = req.headers.authorization;
    if (!req.headers.authorization)
        return next(createError(401, "You are not authenticated !"));

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(createError(403, "Token is invalid !"));
        req.user = user;

        next();
    });
};
