import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import MessageController from '../controllers/message.controller';
import { BodyMessage } from '../validates/validates.body-route';
import { ResultValidate } from '../validates/validates.result-valid';

const router = Router();
router.post(
  '/',
  [...BodyMessage, ResultValidate, VerifyToken],
  MessageController.createMessage
);

export default router;
