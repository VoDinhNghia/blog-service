import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { BodyLogin } from '../validates/validates.body-route';
import { ResultValidate } from '../validates/validates.result-valid';

const router = Router();
router.post('/login', [...BodyLogin, ResultValidate], AuthController.login);

export default router;
