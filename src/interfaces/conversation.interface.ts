import { IqueryPagination } from './pagination.interface';

export interface IcreateConversation {
  name?: string;
  chatWithId?: string;
}

export interface IcreateMessage {
  content?: string;
  conversationId?: string;
  userSendId?: string;
  userReviceId?: string;
}

export interface IqueryMessage extends IqueryPagination {
  conversationId?: string;
  chatWithId?: string;
}
