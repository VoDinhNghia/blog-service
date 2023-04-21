import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { BodyLogin } from '../validates/validates.body-route';
import { ResultValidate } from '../validates/validates.result-valid';
import { VerifyToken } from '../middlewares/verify.jwt';

const router = Router();

router.post('/login', [...BodyLogin, ResultValidate], AuthController.login);

router.put('/logout', [VerifyToken], AuthController.logout);

export default router;
