import { expressjwt, Request as JWTRequest } from "express-jwt";
import { Response, NextFunction } from "express";

function authJwt() {
  const secret = process.env.SECRET as string;
  return expressjwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    // Define paths that should not require authentication here
    path: [
      // { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      // { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      // { url: /\/api\/v1\/users\/login/ },
      // { url: /\/api\/v1\/users\/register/ }
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
