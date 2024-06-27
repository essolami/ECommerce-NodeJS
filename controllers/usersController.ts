import { NextFunction, Request, Response } from "express";
import User from "../models/userSchema";
import { IUser } from "../types/users";
import mongoose from "mongoose";

const checkId = async (
  _: Request,
  res: Response,
  next: NextFunction,
  value: string
) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  next();
};

const getAllUsers = async (req: Request, res: Response) => {
  const userList: IUser[] = await User.find().select("-__v");
  if (!userList) {
    return res.status(500).json({ success: false });
  }
  res.status(200).json(userList);
};

const createUser = async (req: Request, res: Response) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((createdUser: IUser) => res.status(201).json(createdUser))
    .catch((errors: Error) => res.status(400).json(`${errors.message}`));
};

// Get User by ID route
const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.findById(id)
    .then((user) => {
      if (!user) throw new Error("User not found");
      return res.status(200).json({ message: "User by ID", data: user });
    })
    .catch((error) => {
      return res.status(404).json({ message: error.message || error });
    });
};

// Update User route
const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) throw new Error("User not found");
      return res
        .status(200)
        .json({ message: "Updated successfully", data: updatedUser });
    })
    .catch((error) => {
      return res.status(404).json({ message: error.message || error });
    });
};

// Delete User route
const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id)
    .then((deletedUser) => {
      if (!deletedUser) throw new Error("User not found");
      return res.status(200).json({ message: "Deleted successfully" });
    })
    .catch((error) => {
      return res.status(404).json({ message: error.message || error });
    });
};

export {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  checkId,
};
