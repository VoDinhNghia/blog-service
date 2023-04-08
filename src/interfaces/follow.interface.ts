import { IqueryPagination } from './pagination.interface';

export interface IqueryFollow extends IqueryPagination {
  type?: string;
  userFollowId?: string;
  userFollowedId?: string;
}
