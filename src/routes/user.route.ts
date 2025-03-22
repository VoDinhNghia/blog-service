import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import UserController from '../controllers/user.controller';
import { validKeyAccess } from '../validates/user.validate';
import { ResultValidate } from '../validates/result-valid.validate';
import { QueryUser } from '../validates/query-route.validate';
import { BodyCreateUser } from '../validates/body-route.validate';
import { VerifyRoleAccess } from '../middlewares/verify.role-access-api';
import { EuserRole } from '../constants/constant';

const router = Router();

router.post(
  '/',
  [
    ...BodyCreateUser,
    ResultValidate,
    VerifyToken,
    VerifyRoleAccess([EuserRole.ADMIN]),
  ],
  UserController.createNewUser
);

router.get(
  '/',
  [...QueryUser, ResultValidate, VerifyToken],
  UserController.getAllUsers
);

router.get('/:id', [VerifyToken], UserController.getUserById);

router.post('/migrate', [validKeyAccess], UserController.migrateUser);

export default router;
