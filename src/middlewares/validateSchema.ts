import { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';

export function validateSchemaMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      throw { type: 'unprocessable entity', message: { error: validation.error.message } };
    }

    next();
  };
}
