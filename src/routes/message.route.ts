import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import MessageController from '../controllers/message.controller';

const router = Router();

router.post('/', [VerifyToken], MessageController.createMessage);

export default router;
