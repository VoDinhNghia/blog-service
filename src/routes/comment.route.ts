import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import {
  BodyCreateComment,
  BodyUpdateComment,
} from '../validates/body-route.validate';
import { ResultValidate } from '../validates/result-valid.validate';
import CommentController from '../controllers/comment.controller';

const router = Router();

router.post(
  '/',
  [...BodyCreateComment, ResultValidate, VerifyToken],
  CommentController.createComment
);

router.put(
  '/:id',
  [...BodyUpdateComment, ResultValidate, VerifyToken],
  CommentController.updateComment
);

router.delete('/:id', [VerifyToken], CommentController.deleteComment);

export default router;
