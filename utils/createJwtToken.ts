import jwt from "jsonwebtoken";
import { JwtPayload } from "./jwtPayload";
export const createToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, "lama", { expiresIn: "1d" });
};
