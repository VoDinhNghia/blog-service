import { CommonException } from '../exceptions/common-error.exception';
import { PostService } from '../services/post.service';
import { Response, Request } from 'express';
import { postMsg, serverError } from '../constants/message-response.constant';
import { ResponseController } from '../utils/response.util';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/http-status-code.constant';
import { HandleResponseError } from '../utils/handle-response.util';

export default class PostController {
  static service = new PostService();

  static createPost = async (req: Request, res: Response) => {
    try {
      const { body, files } = req;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.createPost(body, files, userId);
      HandleResponseError(res, result, postMsg.create);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static getAllPosts = async (req: Request, res: Response) => {
    try {
      const { query } = req;
      const userId = req[requestInfo.USER].id;
      const results = await this.service.findAllPosts(query, userId);
      HandleResponseError(res, results, postMsg.getAll);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static getPostById = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const result = await this.service.findById(id);
      if (!result) {
        new CommonException(res, httpStatusCode.NOT_FOUND, postMsg.notFound);
      } else {
        new ResponseController(res, result, postMsg.getById);
      }
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static updatePost = async (req: Request, res: Response) => {
    try {
      const { params, body, files } = req;
      const userId = req[requestInfo.USER].id;
      const postId = params.id;
      const result = await this.service.updatePost(
        res,
        postId,
        body,
        files,
        userId
      );
      HandleResponseError(res, result, postMsg.update);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static deletePost = async (req: Request, res: Response) => {
    try {
      const userId = req[requestInfo.USER].id;
      const id: string = req.params.id;
      await this.service.deletePost(res, id, userId);
      HandleResponseError(res, true, postMsg.delete);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static deleteImage = async (req: Request, res: Response) => {
    try {
      const userId = req[requestInfo.USER].id;
      const id: string = req.params.id;
      await this.service.deleteImage(res, id, userId);
      HandleResponseError(res, true, postMsg.deleteImage);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };
}
