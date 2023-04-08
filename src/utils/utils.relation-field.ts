export const postRelation = [
  'attachments',
  'user',
  'likes',
  'shares',
  'likes.user',
];

export const shareRelations = [
  'user',
  'post',
  'likes',
  'likes.user',
  'post.attachments',
];
