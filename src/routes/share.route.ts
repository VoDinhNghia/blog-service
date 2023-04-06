import { Router } from 'express';
import { checkJwt } from '../middlewares/verify.jwt';
import ShareController from '../controllers/share.controller';
import { BodyShare } from '../validates/validates.body-route';
import { ResultValidate } from '../validates/validates.result-valid';

const router = Router();
router.post(
  '/',
  [...BodyShare, ResultValidate, checkJwt],
  ShareController.createShare
);
router.delete('/:id', [checkJwt], ShareController.removeShare);
router.get('/:id', [checkJwt], ShareController.getById);

export default router;
