import { Request, Response } from "express";
import User, { IUser } from "../models/userSchema";

const getAllUsers = async (req: Request, res: Response) => {
  const allUsers: IUser[] = await User.find();
  if (!allUsers) {
    return res.status(500).json({ success: false });
  }
  res.status(200).json(allUsers);
};

const createUser = async (req: Request, res: Response) => {
  const { name, image, countInStock } = req.body;
  const newUser = new User({
    name,
    image,
    countInStock,
  });
  newUser
    .save()
    .then((createdUser: IUser) => res.status(201).json(createdUser))
    .catch((errors: Error) => res.status(400).json(`${errors.message}`));
};

export { getAllUsers, createUser };
