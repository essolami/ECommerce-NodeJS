import { expressjwt, Request as JWTRequest } from "express-jwt";
import { Response, NextFunction, Request } from "express";
import { IUser } from "../types/users";
import jwt from "jsonwebtoken";

function authJwt() {
  const secret = process.env.SECRET as string;
  const api = process.env.API_URL;
  return expressjwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: new RegExp(`^/${api}/products(.*)`), methods: ["GET", "OPTIONS"] },
      {
        url: new RegExp(`^/${api}/categories(.*)`),
        methods: ["GET", "OPTIONS"],
      },
      `/${api}/users/login`,
    ],
  });
}

async function isRevoked(
  req: any,
  token: jwt.Jwt | undefined
): Promise<boolean> {
  if (token && !token.payload["isAdmin"]) {
    return true;
  }
  return false;
}

export { authJwt };
