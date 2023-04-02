import { Router } from 'express'
import { checkJwt } from '../middlewares/check.jwt'
import { checkRole } from '../middlewares/check.role'
import UserController from '../controller/user.controller'
import { EuserRole } from '../constants/constant'

const router = Router()

router.get(
  '/',
  [checkJwt, checkRole([EuserRole.ADMIN])],
  UserController.listAll
)

router.get(
  '/:id',
  [checkJwt, checkRole([EuserRole.ADMIN])],
  UserController.getUserById
)

router.post('/', UserController.newUser)

export default router
