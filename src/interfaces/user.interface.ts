/* eslint-disable @typescript-eslint/no-explicit-any */
import { IqueryPagination } from './pagination.interface';

export interface IuserLogin {
  id?: string;
  email?: string;
  role?: string;
  userId?: string;
  profileId?: string;
}

export interface IcreateUser {
  email?: string;
  password?: string;
  role?: string;
}

export interface IuserMigrate {
  email?: string;
  _id?: string;
  passWord?: string;
  isDeleted?: boolean;
  status?: string;
  role?: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    code?: string;
    _id?: string;
    avatar?: string;
    mobile?: string;
  };
}

export interface IqueryUser extends IqueryPagination {
  userId?: string;
  firstName?: string | any;
}
