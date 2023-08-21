export enum EuserRole {
  ADMIN = 'ADMIN',
  SUPPER_ADMIN = 'SUPPER_ADMIN',
  STUDENT = 'STUDENT',
  LECTURER = 'LECTURER',
  LIBRARIAN = 'LIBRARIAN',
  ACCOUNTANT = 'ACCOUNTANT',
  STAFF = 'STAFF',
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
