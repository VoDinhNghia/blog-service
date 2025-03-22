import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import { ResultValidate } from '../validates/result-valid.validate';
import { BodyConversation } from '../validates/body-route.validate';
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
