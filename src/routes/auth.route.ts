import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { BodyLogin } from '../validates/validates.body-route';
import { ResponseValidBody } from '../validates/validates.common-route';

const router = Router();
router.post('/login', [...BodyLogin, ResponseValidBody], AuthController.login);

export default router;
