import { Router } from 'express';
import { checkJwt } from '../middlewares/verify.jwt';
import LikeController from '../controllers/like.controller';
import { validBodyLike } from '../validates/validates.like';

const router = Router();
router.post('/', [validBodyLike, checkJwt], LikeController.createLike);

export default router;
