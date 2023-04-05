import { CommonException } from '../exceptions/exceptions.common-error';
import { PostService } from '../services/post.service';
import { Response, Request } from 'express';
import { postMsg, serverError } from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';

export default class PostController {
  static service = new PostService();

  static createPost = async (req: Request, res: Response) => {
    try {
      const { body, files } = req;
      const id = res.locals.jwtPayload.userId;
      const result = await this.service.createPost(body, files, id);
      if (!res.headersSent) {
        new ResponseController(res, result, postMsg.create);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };

  static getAllPosts = async (req: Request, res: Response) => {
    try {
      const { query } = req;
      const results = await this.service.findAllPosts(query);
      if (!res.headersSent) {
        new ResponseController(res, results, postMsg.getAll);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  };

  static getPostById = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const result = await this.service.findById(id);
      if (!result) {
        new CommonException(res, 404, postMsg.notFound);
      } else {
        new ResponseController(res, result, postMsg.getById);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  };

  static updatePost = async (req: Request, res: Response) => {
    try {
      const { params, body, files } = req;
      const postId = params.id;
      const result = await this.service.updatePost(res, postId, body, files);
      if (!res.headersSent) {
        new ResponseController(res, result, postMsg.getById);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  };
}
