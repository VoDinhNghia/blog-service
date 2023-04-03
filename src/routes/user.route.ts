import { Router } from 'express';
import { checkJwt } from '../middlewares/check.jwt';
import { checkRole } from '../middlewares/check.role';
import UserController from '../controllers/user.controller';
import { EuserRole } from '../constants/constant';
import { validKeyAccess } from '../validates/validates.user';

const router = Router();

router.get('/', UserController.listAll);

router.get(
  '/:id',
  [checkJwt, checkRole([EuserRole.ADMIN])],
  UserController.getUserById
);

router.post('/migrate', [validKeyAccess], UserController.migrateUser);

export default router;
