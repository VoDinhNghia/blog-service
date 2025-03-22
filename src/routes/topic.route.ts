import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import { ResultValidate } from '../validates/result-valid.validate';
import {
  BodyCreateTopic,
  BodyUpdateTopic,
} from '../validates/body-route.validate';
import TopicController from '../controllers/topic.controller';

const router = Router();

router.post(
  '/',
  [...BodyCreateTopic, ResultValidate, VerifyToken],
  TopicController.createTopic
);

router.get('/:id', [VerifyToken], TopicController.getTopicById);

router.put(
  '/:id',
  [...BodyUpdateTopic, ResultValidate, VerifyToken],
  TopicController.updateTopic
);

router.delete('/:id', [VerifyToken], TopicController.deleteTopic);

export default router;
