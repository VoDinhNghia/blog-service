/* eslint-disable @typescript-eslint/no-explicit-any */
import { IqueryPagination } from './pagination.interface';

export interface Igroup {
  name?: string;
  description?: string;
  privateMode?: boolean;
  createdById?: string;
  members?: string[];
}

export interface Imember {
  groupId?: string;
  memberId?: string;
}

export interface IupdateGroup {
  name?: string;
  description?: string;
  privateMode?: boolean;
}

export interface IqueryGroup extends IqueryPagination {
  name?: string | any;
  privateMode?: boolean;
  createdById?: string;
}
