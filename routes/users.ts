import express from "express";
import {
  checkId,
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/usersController";

const userRouter = express.Router();

userRouter.param("id", checkId);

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

export default userRouter;
