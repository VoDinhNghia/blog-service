import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import MessageController from '../controllers/message.controller';
import { BodyMessage } from '../validates/body-route.validate';
import { ResultValidate } from '../validates/result-valid.validate';
import {
  QueryMessage,
  QueryMessageByConver,
} from '../validates/query-route.validate';

const router = Router();
router.post(
  '/',
  [...BodyMessage, ResultValidate, VerifyToken],
  MessageController.createMessage
);

router.get(
  '/',
  [...QueryMessage, ResultValidate, VerifyToken],
  MessageController.getAllMessage
);

router.get(
  '/conversation',
  [...QueryMessageByConver, ResultValidate, VerifyToken],
  MessageController.getAllMessageByConver
);

router.put(
  '/update-status/:id',
  [VerifyToken],
  MessageController.updateStatusMessage
);

export default router;
