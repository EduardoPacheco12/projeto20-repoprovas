import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface decodedId {
  id: string;
}

export async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorization: string | undefined = req.headers.authorization;
  if (!authorization) {
    return res.status(404).send('Token not found');
  }

  const token = authorization?.replace('Bearer ', '');
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return res.sendStatus(401);
    }
    res.locals.id = decoded as decodedId['id'];
    next();
  });
}
