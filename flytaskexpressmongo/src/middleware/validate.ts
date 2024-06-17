import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const validationMiddleware = (type: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(type, req.body);

    validate(dtoInstance).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        res.status(400).json({ errors });
      } else {
        req.body = dtoInstance;
        next();
      }
    });
  };
};
