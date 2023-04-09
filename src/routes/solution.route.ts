import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import { ResultValidate } from '../validates/validates.result-valid';
import { BodyCreateSolution } from '../validates/validates.body-route';
import SolutionController from '../controllers/solution.controller';

const router = Router();

router.post(
  '/',
  [...BodyCreateSolution, ResultValidate, VerifyToken],
  SolutionController.createSolution
);

export default router;
