/* eslint-disable @typescript-eslint/no-explicit-any */
import { IqueryPagination } from './pagination.interface';

export interface IcreatePost {
  title?: string;
  content?: string;
  type?: string;
  userId?: string;
}

export interface Iattchment {
  originalname?: string;
  url?: string;
}

export interface IqueryPost extends IqueryPagination {
  userId?: string;
  title?: string | any;
}

export interface IlikePost {
  userId?: string;
  postId?: string;
  shareId?: string;
  type?: string;
}

export interface IsharePost {
  userId?: string;
  postId?: string;
  privateMode?: boolean;
}
