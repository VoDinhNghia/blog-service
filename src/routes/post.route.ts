import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { validBodyPost } from '../validates/validates.post';
import { checkJwt } from '../middlewares/verify.jwt';
import { uploadImage } from '../controllers/upload.controller';

const router = Router();
router.post(
  '/',
  [uploadImage.array('imageFile', 10), validBodyPost, checkJwt],
  PostController.createPost
);

router.get('/', [checkJwt], PostController.getAllPosts);
router.get('/:id', [checkJwt], PostController.getPostById);
router.put(
  '/:id',
  [uploadImage.array('imageFile', 10), checkJwt],
  PostController.updatePost
);

export default router;
