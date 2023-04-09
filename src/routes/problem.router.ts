import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import { ResultValidate } from '../validates/validates.result-valid';
import { BodyCreateProblem } from '../validates/validates.body-route';
import ProblemController from '../controllers/problem.controller';

const router = Router();

router.post(
  '/',
  [...BodyCreateProblem, ResultValidate, VerifyToken],
  ProblemController.createProblem
);

export default router;
