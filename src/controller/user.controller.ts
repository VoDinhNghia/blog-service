import { Request, Response } from 'express'
import { validate } from 'class-validator'

import { User } from '../entity/user.entity'
import { AppDataSource } from '../data-source'
import { serverError, userMsg } from '../constants/constants.message-response'

class UserController {
  static listAll = async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find({
      select: ['id', 'email', 'role'],
    })
    res
      .status(200)
      .send({ statusCode: 200, data: users, message: userMsg.getAll })
  }

  static getUserById = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const userRepository = AppDataSource.getRepository(User)
    let user
    try {
      user = await userRepository.findOneBy({ id })
    } catch (error) {
      res.status(404).send({ statusCode: 404, message: userMsg.notFound })
    }
    res
      .status(200)
      .send({ statusCode: 200, data: user, message: userMsg.getById })
  }

  static newUser = async (req: Request, res: Response) => {
    try {
      const userRepository = AppDataSource.getRepository(User)
      const { email } = req.body
      let user = new User()
      user = { ...req.body }
      const errors = await validate(user)
      if (errors.length > 0) {
        res.status(400).send(errors)
      }
      const existedEmail = await userRepository.findOneBy({ email })
      if (!existedEmail) {
        res.status(409).send({ statusCode: 409, message: userMsg.existedEmail })
      }
      user.hashPassword()
      await userRepository.save(user)
      res.status(201).send({ statusCode: 201, message: userMsg.create })
    } catch (error) {
      res.status(500).send({ statusCode: 500, message: serverError })
    }
  }
}

export default UserController
