import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import ShareController from '../controllers/share.controller';
import { BodyShare } from '../validates/validates.body-route';
import { ResultValidate } from '../validates/validates.result-valid';

const router = Router();
router.post(
  '/',
  [...BodyShare, ResultValidate, VerifyToken],
  ShareController.createShare
);
router.delete('/:id', [VerifyToken], ShareController.removeShare);
router.get('/:id', [VerifyToken], ShareController.getById);

export default router;
