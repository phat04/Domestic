declare namespace Express {
  interface Request {
    payload: JwtPayload;
  }
}
