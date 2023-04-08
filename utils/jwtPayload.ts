import { Role } from '../entities/User';

export type JwtPayload = {
  sub: number;
  role: Role;
};
