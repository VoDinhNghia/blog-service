import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { BodyLogin } from '../validates/body-route.validate';
import { ResultValidate } from '../validates/result-valid.validate';
import { VerifyToken } from '../middlewares/verify.jwt';

const router = Router();

router.post('/login', [...BodyLogin, ResultValidate], AuthController.login);

router.put('/logout', [VerifyToken], AuthController.logout);

export default router;
