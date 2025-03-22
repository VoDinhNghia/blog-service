import { Router } from 'express';
import { VerifyToken } from '../middlewares/verify.jwt';
import { ResultValidate } from '../validates/result-valid.validate';
import {
  BodyCreateSolution,
  BodyUpdateSolution,
} from '../validates/body-route.validate';
import SolutionController from '../controllers/solution.controller';

const router = Router();

router.post(
  '/',
  [...BodyCreateSolution, ResultValidate, VerifyToken],
  SolutionController.createSolution
);

router.delete('/:id', [VerifyToken], SolutionController.deleteSolution);

router.put(
  '/:id',
  [...BodyUpdateSolution, ResultValidate, VerifyToken],
  SolutionController.updateSolution
);

export default router;
