/* eslint-disable @typescript-eslint/no-explicit-any */
import { IqueryPagination } from './pagination.interface';

export interface IcreatePost {
  title?: string;
  content?: string;
  type?: string;
  userId?: string;
  privateMode?: boolean;
}

export interface Iattchment {
  originalname?: string;
  url?: string;
}

export interface IqueryPost extends IqueryPagination {
  userId?: string;
  title?: string | any;
  privateMode?: boolean | any;
}

export interface IlikePost {
  userId?: string;
  postId?: string;
  shareId?: string;
  type?: string;
  action?: string;
}

export interface IsharePost {
  userId?: string;
  postId?: string;
  privateMode?: boolean;
}

export interface IqueryShare extends IqueryPagination {
  userId?: string;
  privateMode?: boolean;
  fromDate?: Date;
  toDate?: Date;
}

export interface IcreateComment {
  content?: string;
  postId?: string;
  userId?: string;
}
