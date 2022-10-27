import { Injectable, NestMiddleware } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const headerToken = req.headers.authorization;
    const authToken = process.env.AUTH_TOKEN;

    if (headerToken !== authToken) {
      throw new UnauthorizedException();
    }

    next();
  }
}
