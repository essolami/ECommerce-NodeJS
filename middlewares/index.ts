import { Request, Response, NextFunction } from "express";

export function isAuth(req: Request, res: Response, next: NextFunction) {
  if (req.query?.admin === "true") {
    next();
    return;
  }
  return res.redirect("/products?admin=true");
}
