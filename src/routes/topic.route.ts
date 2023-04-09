import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import { ResultValidate } from '../validates/validates.result-valid';
import { BodyCreateTopic } from '../validates/validates.body-route';
import TopicController from '../controllers/topic.controller';

const router = Router();

router.post(
  '/',
  [...BodyCreateTopic, ResultValidate, VerifyToken],
  TopicController.createTopic
);

export default router;
