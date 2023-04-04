import { Router } from 'express';
import { checkJwt } from '../middlewares/verify.jwt';
import { checkRole } from '../middlewares/verify.role-access-api';
import UserController from '../controllers/user.controller';
import { EuserRole } from '../constants/constant';
import { validKeyAccess } from '../validates/validates.user';

const router = Router();

router.get(
  '/',
  [checkJwt, checkRole([EuserRole.ADMIN, EuserRole.SUPPER_ADMIN])],
  UserController.listAll
);

router.get(
  '/:id',
  [checkJwt, checkRole([EuserRole.ADMIN, EuserRole.SUPPER_ADMIN])],
  UserController.getUserById
);

router.post('/migrate', [validKeyAccess], UserController.migrateUser);

export default router;
