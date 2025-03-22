import { CommonException } from '../exceptions/exceptions.common-error';
import { CommentService } from '../services/comment.service';
import { Response, Request } from 'express';
import {
  commentMsg,
  postMsg,
  serverError,
} from '../constants/constants.message-response';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/constants.httpStatusCode';
import { PostService } from '../services/post.service';
import { Equal } from 'typeorm';
import { ResponseController } from '../utils/utils.response';

export default class CommentController {
  static service = new CommentService();
  static postService = new PostService();

  static createComment = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req[requestInfo.USER].id;
      const post = await this.postService.findOnePost(
        { id: body?.postId, deletedAt: null },
        null
      );
      if (!post) {
        new CommonException(res, httpStatusCode.NOT_FOUND, postMsg.notFound);
      }
      const result = await this.service.createComment(body, userId);
      return new ResponseController(res, result, commentMsg.create);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static updateComment = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const id = req.params.id;
      const userId = req[requestInfo.USER].id;
      const comment = await this.service.findOneComment(
        { id: Equal(id) },
        null
      );
      if (String(userId) !== String(comment?.userId)) {
        return new CommonException(
          res,
          httpStatusCode.FORBIDEN,
          commentMsg.notPermission
        );
      }
      await this.service.updateComment(id, body);
      return new ResponseController(res, true, commentMsg.update);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static deleteComment = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userId = req[requestInfo.USER].id;
      const comment = await this.service.findOneComment(
        { id: Equal(id) },
        { post: true }
      );
      if (!comment) {
        return new CommonException(
          res,
          httpStatusCode.NOT_FOUND,
          commentMsg.notFound
        );
      }
      if (
        String(userId) != String(comment.userId) ||
        String(userId) != String(comment.post?.userId)
      ) {
        return new CommonException(
          res,
          httpStatusCode.FORBIDEN,
          commentMsg.notPermission
        );
      }
      await this.service.deleteComment(id);
      return new ResponseController(res, true, commentMsg.delete);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };
}
