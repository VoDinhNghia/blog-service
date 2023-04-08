import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import { BodyFollow } from '../validates/validates.body-route';
import { ResultValidate } from '../validates/validates.result-valid';
import FollowController from '../controllers/follow.controller';
import { QueryFollow } from '../validates/validates.query-route';

const router = Router();

router.post(
  '/',
  [...BodyFollow, ResultValidate, VerifyToken],
  FollowController.createFollow
);

router.get(
  '/',
  [...QueryFollow, ResultValidate, VerifyToken],
  FollowController.getListFollow
);

export default router;
