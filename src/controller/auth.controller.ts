import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { User } from '../entity/user.entity'
import { config, expireToken } from '../config/config'
import { AppDataSource } from '../data-source'
import { authMsg, serverError } from '../constants/constants.message-response'

class AuthController {
  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      if (!(email && password)) {
        res.status(400).send({ statusCode: 400, message: authMsg.badRequest })
      }

      const userRepository = AppDataSource.getRepository(User)
      let user: User
      try {
        user = await userRepository.findOneOrFail({ where: { email } })
      } catch (error) {
        res.status(401).send({ statusCode: 401, message: authMsg.invalid })
      }
      if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        res.status(401).send({ statusCode: 401, message: authMsg.invalid })
        return
      }
      const token = jwt.sign(
        { userId: user.id, username: user.email },
        config.jwtSecret,
        { expiresIn: expireToken }
      )
      res.status(200).send({
        statusCode: 200,
        data: { accessToken: token },
        message: authMsg.login,
      })
    } catch (error) {
      res.status(500).send({ statusCode: 500, message: serverError })
    }
  }
}
export default AuthController
