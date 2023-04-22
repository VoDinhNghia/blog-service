import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import { ResultValidate } from '../validates/validates.result-valid';
import { BodyConversation } from '../validates/validates.body-route';

const router = Router();

router.post('/', [...BodyConversation, ResultValidate, VerifyToken]);

router.get('/one/:chatWithId', [VerifyToken]);

export default router;
