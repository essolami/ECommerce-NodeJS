import { expressjwt, Request as JWTRequest } from "express-jwt";
import { Response, NextFunction } from "express";

function authJwt() {
  const secret = process.env.SECRET as string;
  const api = process.env.API_URL;
  return expressjwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: /\API_V1\/products(.*)/, methods: ["GET"] },
      { url: /\API_V1\/categories(.*)/, methods: ["GET"] },
      `/${api}/users/login`,
    ],
  });
}

const handleAuthErrors = (
  err: any,
  req: JWTRequest,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "UnauthorizedError") {
    return res
      .status(401)
      .json({ message: "Invalid token or no token provided" });
  }
  next(err);
};

export { authJwt, handleAuthErrors };
