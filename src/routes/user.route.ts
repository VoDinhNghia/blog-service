import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import { CheckRoleAccess } from '../middlewares/verify.role-access-api';
import UserController from '../controllers/user.controller';
import { EuserRole } from '../constants/constant';
import { validKeyAccess } from '../validates/validates.user';
import { ResultValidate } from '../validates/validates.result-valid';
import { QueryUser } from '../validates/validates.query-route';

const router = Router();

router.get(
  '/',
  [
    ...QueryUser,
    ResultValidate,
    VerifyToken,
    CheckRoleAccess([EuserRole.ADMIN, EuserRole.SUPPER_ADMIN]),
  ],
  UserController.getAllUsers
);

router.get('/:id', [VerifyToken], UserController.getUserById);

router.post('/migrate', [validKeyAccess], UserController.migrateUser);

export default router;
