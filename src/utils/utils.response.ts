import { Response } from 'express';
export class ResponseController {
  constructor(
    res: Response,
    data: object | object[] | string | boolean | number,
    message: string
  ) {
    res.status(200).send({ statusCode: 200, data, message });
  }
}
