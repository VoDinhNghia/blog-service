import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import { ResultValidate } from '../validates/validates.result-valid';
import { BodyConversation } from '../validates/validates.body-route';
import ConversationController from '../controllers/conversation.controller';

const router = Router();

router.post(
  '/',
  [...BodyConversation, ResultValidate, VerifyToken],
  ConversationController.createConversation
);

router.get(
  '/one/:chatWithId',
  [VerifyToken],
  ConversationController.getOneConversation
);

router.get(
  '/list-by-user',
  [VerifyToken],
  ConversationController.findAllConversationByUser
);

export default router;
