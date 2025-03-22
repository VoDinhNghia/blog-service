import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import LikeController from '../controllers/like.controller';
import { BodyLike } from '../validates/body-route.validate';
import { ResultValidate } from '../validates/result-valid.validate';

const router = Router();

router.post(
  '/',
  [...BodyLike, ResultValidate, VerifyToken],
  LikeController.createLike
);

export default router;
