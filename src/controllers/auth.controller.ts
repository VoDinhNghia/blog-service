import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';
import { config, expireToken } from '../configs/config';
import { AppDataSource } from '../data-source';
import { authMsg, serverError } from '../constants/message-response.constant';
import { ResponseController } from '../utils/response.util';
import { CommonException } from '../exceptions/common-error.exception';
import { selectUser } from '../utils/select-fields.util';
import { Equal } from 'typeorm';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/http-status-code.constant';

export default class AuthController {
  static selectFields: string[] | unknown = [...selectUser, 'password'];
  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { email: Equal(email) },
        select: this.selectFields,
      });
      if (!user?.checkIfUnencryptedPasswordIsValid(password)) {
        return new CommonException(
          res,
          httpStatusCode.UN_AUTHORIZED,
          authMsg.invalid
        );
      }
      await userRepository.update(user.id, { statusLogin: true });
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        userId: user.userId,
        profileId: user.profileId,
      };
      const token = jwt.sign(payload, config.JWT_PRIVATE_KEY, {
        algorithm: 'HS512',
        expiresIn: expireToken,
      });
      new ResponseController(
        res,
        { ...user, accessToken: token },
        authMsg.login
      );
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static logout = async (req: Request, res: Response) => {
    try {
      const id = req[requestInfo.USER].id;
      const userRepository = AppDataSource.getRepository(User);
      await userRepository.update(id, { statusLogin: false });
      new ResponseController(res, true, authMsg.logout);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };
}
