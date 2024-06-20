import express, { Request, Response } from "express";

const userRouter = express.Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.send("Lolipop");
});

userRouter.get("/list", (req: Request, res: Response) => {
  res.send(JSON.stringify([{ firstName: "hamza" }, { firstName: "loubna" }]));
});

export default userRouter;
