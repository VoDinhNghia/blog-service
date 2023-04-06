import { Router } from 'express';
import { checkJwt } from '../middlewares/verify.jwt';
import LikeController from '../controllers/like.controller';
import { BodyLike } from '../validates/validates.body-route';
import { ResponseValidBody } from '../validates/validates.common-route';

const router = Router();
router.post(
  '/',
  [...BodyLike, ResponseValidBody, checkJwt],
  LikeController.createLike
);

export default router;
