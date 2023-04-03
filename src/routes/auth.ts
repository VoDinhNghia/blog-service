import { Router } from 'express';
import AuthController from '../controller/auth.controller';
import { validBodyLogin } from '../validates/validates.auth';

const router = Router();
router.post('/login', [validBodyLogin], AuthController.login);

export default router;
