import { Request, Response, NextFunction } from "express";

export function isAuth(req: Request, res: Response, next: NextFunction) {
  if (req.query?.admin === "true") {
    next();
    return;
  }
  return res.send("Ma3ndna mandiro lik u should logged in");
}
