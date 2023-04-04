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

export default router;
