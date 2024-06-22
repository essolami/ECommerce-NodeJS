import express from "express";
import { createUser, getAllUsers } from "../controllers/usersController";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.post("/", createUser);

export default userRouter;
