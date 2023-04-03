import { Response } from 'express';
export class UnAuthorizedException {
  constructor(res: Response) {
    res.status(401).send({ statusCode: 401, message: 'Unauthorized' });
  }
}
