import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const checkId = async (
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
