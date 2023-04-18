export const postRelation = [
  'attachments',
  'user',
  'likes',
  'shares',
  'comments',
  'likes.user',
  'shares.user',
  'comments.user',
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
  'group',
  'createdBy',
  'studyProblems',
  'studyProblems.createdBy',
  'studyProblems.solutions',
  'studyProblems.solutions.createdBy',
];
