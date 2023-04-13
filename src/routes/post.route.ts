import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { VerifyToken } from '../middlewares/verify.jwt';
import { uploadImage } from '../controllers/upload.controller';
import { ResultValidate } from '../validates/validates.result-valid';
import { BodyPost } from '../validates/validates.body-route';
import { QueryPost } from '../validates/validates.query-route';

const router = Router();

router.post(
  '/',
  [
    uploadImage.array('imageFile', 10),
    ...BodyPost,
    ResultValidate,
    VerifyToken,
  ],
  PostController.createPost
);

router.get(
  '/',
  [...QueryPost, ResultValidate, VerifyToken],
  PostController.getAllPosts
);
router.get('/:id', [VerifyToken], PostController.getPostById);

router.put(
  '/:id',
  [uploadImage.array('imageFile', 10), VerifyToken],
  PostController.updatePost
);

router.delete('/:id', [VerifyToken], PostController.deletePost);

router.delete('/image/:id', [VerifyToken], PostController.deleteImage);

export default router;
