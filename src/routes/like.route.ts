import { Router } from 'express';
import { checkJwt } from '../middlewares/verify.jwt';
import LikeController from '../controllers/like.controller';

const router = Router();
router.post('/', [checkJwt], LikeController.createLike);
router.delete('/:id', [checkJwt], LikeController.removeLike);

export default router;
