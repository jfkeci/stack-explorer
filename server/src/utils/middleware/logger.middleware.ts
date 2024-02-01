import { Request, Response } from 'express';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: () => void) {
    const { method, hostname, originalUrl, headers } = req;
    Logger.log(
      `Request: ${method} ${hostname} ${originalUrl} with headers ${JSON.stringify(headers)}`,
    );

    next();
  }
}
