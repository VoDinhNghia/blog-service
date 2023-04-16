import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import UserController from '../controllers/user.controller';
import { validKeyAccess } from '../validates/validates.user';
import { ResultValidate } from '../validates/validates.result-valid';
import { QueryUser } from '../validates/validates.query-route';

const router = Router();

router.get(
  '/',
  [...QueryUser, ResultValidate, VerifyToken],
  UserController.getAllUsers
);

router.get('/:id', [VerifyToken], UserController.getUserById);

router.post('/migrate', [validKeyAccess], UserController.migrateUser);

export default router;
