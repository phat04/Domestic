import { Role } from "../entities/User";

export type JwtPayload = {
  id: number;
  role: Role;
};
