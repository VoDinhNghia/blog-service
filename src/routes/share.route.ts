import { Router } from 'express';
import { checkJwt } from '../middlewares/verify.jwt';
import ShareController from '../controllers/share.controller';

const router = Router();
router.post('/', [checkJwt], ShareController.createShare);
router.delete('/:id', [checkJwt], ShareController.removeShare);
router.get('/:id', [checkJwt], ShareController.getById);

export default router;
