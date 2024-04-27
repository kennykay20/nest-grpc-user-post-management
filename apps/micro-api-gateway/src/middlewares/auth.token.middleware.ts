import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function authTokenMiddleware(
  req: Request,
  res: Response,
  next: () => any,
) {
  const token = req.signedCookies.postToken;

  const hundredYears = 100 * 365 * 24 * 60 * 60 * 1000;
  if (!token) {
    res.cookie('postToken', uuidv4(), {
      signed: true,
      expires: new Date(Date.now() + hundredYears),
      sameSite: false,
      secure: true,
      httpOnly: false,
    });
  }

  return next();
}
