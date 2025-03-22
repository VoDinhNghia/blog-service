import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import { BodyFollow } from '../validates/body-route.validate';
import { ResultValidate } from '../validates/result-valid.validate';
import FollowController from '../controllers/follow.controller';
import { QueryFollow } from '../validates/query-route.validate';

const router = Router();

router.post(
  '/',
  [...BodyFollow, ResultValidate, VerifyToken],
  FollowController.createFollow
);

router.delete('/:id', [VerifyToken], FollowController.removeFollow);

router.get(
  '/',
  [...QueryFollow, ResultValidate, VerifyToken],
  FollowController.getListFollow
);

export default router;
