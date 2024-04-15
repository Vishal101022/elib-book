import express from "express";
import { createUser } from "./userHandler";
const userRouter = express.Router();

userRouter.post("/register", createUser);

export default userRouter;

