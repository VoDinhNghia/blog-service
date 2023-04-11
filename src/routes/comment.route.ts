import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import { BodyCreateComment } from '../validates/validates.body-route';
import { ResultValidate } from '../validates/validates.result-valid';
import CommentController from '../controllers/comment.controller';

const router = Router();

router.post(
  '/',
  [...BodyCreateComment, ResultValidate, VerifyToken],
  CommentController.createComment
);

export default router;
