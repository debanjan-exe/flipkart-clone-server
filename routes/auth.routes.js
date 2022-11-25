import express from "express";
import { signup, signin } from "../controllers/auth.controllers.js";

const router = express.Router();

//create a user
router.post("/signup", signup);

//sign in
router.post("/signin", signin);

export default router;
