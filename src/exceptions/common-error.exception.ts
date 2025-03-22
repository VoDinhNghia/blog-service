import { Response } from 'express';
export class CommonException {
  constructor(res: Response, statusCode: number, message: string | object[]) {
    res.status(statusCode).send({ statusCode, message });
  }
}
