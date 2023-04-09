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

export const followRelations = ['userFollow', 'userFollowed'];

export const groupRelations = [
  'createdBy',
  'members',
  'topics',
  'members.member',
];

export const topicRelations = [
  'createdBy',
  'group',
  'createBy',
  'studyProblems',
];
