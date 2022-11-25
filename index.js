import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors());

const connect = () => {
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log("DB is connected !");
        })
        .catch((err) => {
            throw err;
        });
};

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is connected !");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connect();
    console.log(`Server is connected on port ${PORT}!`);
});
