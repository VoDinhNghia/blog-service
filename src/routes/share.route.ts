import { Router } from 'express';
import { checkJwt } from '../middlewares/verify.jwt';
import ShareController from '../controllers/share.controller';

const router = Router();
router.post('/', [checkJwt], ShareController.createShare);
router.delete('/:id', [checkJwt], ShareController.removeShare);

export default router;
