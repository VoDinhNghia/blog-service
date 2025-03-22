import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { VerifyToken } from '../middlewares/verify.jwt';
import { uploadImage } from '../controllers/upload.controller';
import { ResultValidate } from '../validates/result-valid.validate';
import { BodyPost } from '../validates/body-route.validate';
import { QueryPost } from '../validates/query-route.validate';

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
