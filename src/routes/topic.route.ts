import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import { ResultValidate } from '../validates/validates.result-valid';
import {
  BodyCreateTopic,
  BodyUpdateTopic,
} from '../validates/validates.body-route';
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
