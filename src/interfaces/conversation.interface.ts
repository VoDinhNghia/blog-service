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
