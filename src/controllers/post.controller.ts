import { CommonException } from '../exceptions/exceptions.common-error';
import { PostService } from '../services/post.service';
import { Response, Request } from 'express';
import { postMsg, serverError } from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';

export default class PostController {
  static service = new PostService();

  static createPost = (req: Request, res: Response) => {
    try {
      const { body } = req;
      console.log('req', req.files);
      if (!res.headersSent) {
        new ResponseController(res, body, postMsg.create);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}
