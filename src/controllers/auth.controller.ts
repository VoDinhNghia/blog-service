import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';
import { config, expireToken } from '../configs/config';
import { AppDataSource } from '../data-source';
import { authMsg, serverError } from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';
import { CommonException } from '../exceptions/exceptions.common-error';
import { selectUser } from '../utils/utils.select-fields';

export default class AuthController {
  static selectFields: string[] | unknown = [...selectUser, 'password'];
  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { email },
        select: this.selectFields,
      });
      if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        return new CommonException(res, 401, authMsg.invalid);
      }
      const token = jwt.sign(
        { userId: user.id, username: user.email },
        config.JWT_PRIVATE_KEY,
        { algorithm: 'HS512', expiresIn: expireToken }
      );
      new ResponseController(
        res,
        { ...user, accessToken: token },
        authMsg.login
      );
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}
