import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import { ResultValidate } from '../validates/result-valid.validate';
import {
  BodyCreateProblem,
  BodyUpdateProblem,
} from '../validates/body-route.validate';
import ProblemController from '../controllers/problem.controller';

const router = Router();

router.post(
  '/',
  [...BodyCreateProblem, ResultValidate, VerifyToken],
  ProblemController.createProblem
);

router.put(
  '/:id',
  [...BodyUpdateProblem, ResultValidate, VerifyToken],
  ProblemController.updateProblem
);

router.delete('/:id', [VerifyToken], ProblemController.deleteProblem);

export default router;
