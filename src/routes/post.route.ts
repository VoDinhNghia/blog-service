import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { checkJwt } from '../middlewares/verify.jwt';
import { uploadImage } from '../controllers/upload.controller';
import { ResultValidate } from '../validates/validates.result-valid';
import { BodyPost } from '../validates/validates.body-route';
import { QueryPost } from '../validates/validates.query-route';

const router = Router();
router.post(
  '/',
  [uploadImage.array('imageFile', 10), ...BodyPost, ResultValidate, checkJwt],
  PostController.createPost
);

router.get(
  '/',
  [...QueryPost, ResultValidate, checkJwt],
  PostController.getAllPosts
);
router.get('/:id', [checkJwt], PostController.getPostById);
router.put(
  '/:id',
  [uploadImage.array('imageFile', 10), checkJwt],
  PostController.updatePost
);

router.delete('/:id', [checkJwt], PostController.deletePost);

export default router;
