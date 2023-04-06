import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { checkJwt } from '../middlewares/verify.jwt';
import { uploadImage } from '../controllers/upload.controller';
import { ResponseValidBody } from '../validates/validates.common-route';
import { BodyPost } from '../validates/validates.body-route';

const router = Router();
router.post(
  '/',
  [
    uploadImage.array('imageFile', 10),
    ...BodyPost,
    ResponseValidBody,
    checkJwt,
  ],
  PostController.createPost
);

router.get('/', [checkJwt], PostController.getAllPosts);
router.get('/:id', [checkJwt], PostController.getPostById);
router.put(
  '/:id',
  [uploadImage.array('imageFile', 10), checkJwt],
  PostController.updatePost
);

router.delete('/:id', [checkJwt], PostController.deletePost);

export default router;
