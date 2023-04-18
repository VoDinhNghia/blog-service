import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import {
  BodyGroup,
  BodyUpdateGroup,
  BodyUpdateGroupMember,
} from '../validates/validates.body-route';
import { ResultValidate } from '../validates/validates.result-valid';
import GroupController from '../controllers/group.controller';
import { QueryGroup } from '../validates/validates.query-route';

const router = Router();

router.post(
  '/',
  [...BodyGroup, ResultValidate, VerifyToken],
  GroupController.createGroup
);

router.put(
  '/:id',
  [...BodyUpdateGroup, ResultValidate, VerifyToken],
  GroupController.updateGroup
);

router.put(
  '/member/:groupId',
  [...BodyUpdateGroupMember, ResultValidate, VerifyToken],
  GroupController.addAndUpdateMembers
);

router.delete('/:id', [VerifyToken], GroupController.deleteGroup);

router.delete('/member/:id', [VerifyToken], GroupController.deleteMember);

router.delete(
  '/leave/:groupId',
  [VerifyToken],
  GroupController.memberLeavegroup
);

router.get(
  '/',
  [...QueryGroup, ResultValidate, VerifyToken],
  GroupController.getAllGroups
);

router.get('/:id', [VerifyToken], GroupController.getGroupById);

export default router;
