import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';
import { config, expireToken } from '../config/config';
import { AppDataSource } from '../data-source';
import { authMsg, serverError } from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';
import { CommonException } from '../exceptions/exceptions.common-error';

class AuthController {
  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      let user: User;
      try {
        user = await userRepository.findOneOrFail({ where: { email } });
      } catch (error) {
        new CommonException(res, 401, authMsg.invalid);
      }
      if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        return new CommonException(res, 401, authMsg.invalid);
      }
      const token = jwt.sign(
        { userId: user.id, username: user.email },
        config.JWT_PRIVATE_KEY,
        { algorithm: 'HS512', expiresIn: expireToken }
      );
      new ResponseController(res, { accessToken: token }, authMsg.login);
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}
export default AuthController;
