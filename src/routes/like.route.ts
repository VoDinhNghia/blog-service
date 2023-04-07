import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import LikeController from '../controllers/like.controller';
import { BodyLike } from '../validates/validates.body-route';
import { ResultValidate } from '../validates/validates.result-valid';

const router = Router();
router.post(
  '/',
  [...BodyLike, ResultValidate, VerifyToken],
  LikeController.createLike
);

export default router;
