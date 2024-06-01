export enum EuserRole {
  ADMIN = 'ADMIN',
  SUPPER_ADMIN = 'SUPPER_ADMIN',
  STUDENT = 'STUDENT',
  LECTURER = 'LECTURER',
  LIBRARIAN = 'LIBRARIAN',
  ACCOUNTANT = 'ACCOUNTANT',
  STAFF = 'STAFF',
}

export enum EuserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const keyAccessBackend = 'blog-service-access-backend_@mgt-student';

export const formatDateType = 'yyyy-mm-dd';

export enum ElikeType {
  POST = 'POST',
  SHARE = 'SHARE',
}

export enum ElikeAction {
  LIKE = 'LIKE',
  HEART = 'HEART',
  LOVE = 'LOVE',
}

export enum EqueryFollowType {
  FOLLOWING = 'FOLLOWING',
  FOLLOWED = 'FOLLOWED',
}

export const requestInfo = {
  USER: 'user',
};

export const socketMsg = {
  MESSAGE_NEW: 'message_new',
};

export const keyAccessHeaderHttp = 'key-access-secret';
