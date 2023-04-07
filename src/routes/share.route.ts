import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import ShareController from '../controllers/share.controller';
import { BodyShare, BodyUpdateShare } from '../validates/validates.body-route';
import { ResultValidate } from '../validates/validates.result-valid';
import { QuerySharePost } from '../validates/validates.query-route';

const router = Router();

router.post(
  '/',
  [...BodyShare, ResultValidate, VerifyToken],
  ShareController.createShare
);

router.delete('/:id', [VerifyToken], ShareController.removeShare);

router.get('/:id', [VerifyToken], ShareController.getById);

router.get(
  '/',
  [...QuerySharePost, ResultValidate, VerifyToken],
  ShareController.getAllShareOfUser
);

router.put(
  '/:id',
  [...BodyUpdateShare, ResultValidate, VerifyToken],
  ShareController.updateModeShare
);

export default router;
