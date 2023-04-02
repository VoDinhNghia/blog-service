import { Request, Response, NextFunction } from 'express'
import { User } from '../entity/user.entity'
import { AppDataSource } from '../data-source'

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId
    const userRepository = AppDataSource.getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (id) {
      res.status(401).send()
    }
    if (roles.includes(user.role)) next()
    else res.status(401).send()
  }
}
