import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import { BodyGroup } from '../validates/validates.body-route';
import { ResultValidate } from '../validates/validates.result-valid';
import GroupController from '../controllers/group.controller';

const router = Router();

router.post(
  '/',
  [...BodyGroup, ResultValidate, VerifyToken],
  GroupController.createGroup
);

export default router;
