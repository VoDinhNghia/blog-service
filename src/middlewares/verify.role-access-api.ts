import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../data-source';
import { UnAuthorizedException } from '../exceptions/exceptions.unauthorized';

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId;
    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { id } });
    } catch {
      return new UnAuthorizedException(res);
    }
    if (roles.includes(user.role)) next();
    else return new UnAuthorizedException(res);
  };
};
