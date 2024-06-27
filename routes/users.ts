import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  loginUser,
  updateUserById,
} from "../controllers/usersController";
import { checkId } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.post("/login", loginUser);

userRouter.param("id", checkId);

userRouter
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

export default userRouter;
