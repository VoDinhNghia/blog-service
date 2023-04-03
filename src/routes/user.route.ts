import { Router } from 'express';
import { checkJwt } from '../middlewares/check.jwt';
import { checkRole } from '../middlewares/check.role';
import UserController from '../controller/user.controller';
import { EuserRole } from '../constants/constant';
import { validBodyUser } from '../validates/validates.user';

const router = Router();

router.get('/', UserController.listAll);

router.get(
  '/:id',
  [checkJwt, checkRole([EuserRole.ADMIN])],
  UserController.getUserById
);

router.post('/', [validBodyUser], UserController.createUser);

export default router;
