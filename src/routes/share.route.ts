import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import ShareController from '../controllers/share.controller';
import { BodyShare, BodyUpdateShare } from '../validates/body-route.validate';
import { ResultValidate } from '../validates/result-valid.validate';
import { QuerySharePost } from '../validates/query-route.validate';

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
