import { Request, Response } from "express";
import User from "../models/userSchema";
import { IUser } from "../types/users";

const getAllUsers = async (req: Request, res: Response) => {
  const allUsers: IUser[] = await User.find();
  if (!allUsers) {
    return res.status(500).json({ success: false });
  }
  res.status(200).json(allUsers);
};

const createUser = async (req: Request, res: Response) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((createdUser: IUser) => res.status(201).json(createdUser))
    .catch((errors: Error) => res.status(400).json(`${errors.message}`));
};

export { getAllUsers, createUser };
