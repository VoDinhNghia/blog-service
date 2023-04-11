export const serverError = 'Server error';
export const authMsg = {
  login: 'Login success',
  invalid: 'Email or password incorect',
};

export const userMsg = {
  notFound: 'User not found',
  existedEmail: 'Email existed already',
  create: 'Create user success',
  getAll: 'Get all user success',
  getById: 'Get by id success',
  validateBody: {
    notEmpty: 'email or password or role must provided',
    validEmail: 'email incorect format test@gmail.com',
    lengthPassword: 'Length of password must >= 6',
    role: 'Role invalid',
  },
  syncData: {
    validKey: 'Not permission access service',
    success: 'Migrate data success',
    notPermission: 'Please use function sync data',
  },
};

export const postMsg = {
  create: 'Create post success',
  update: 'Update post success',
  delete: 'Delete post success',
  getById: 'Get post by id success',
  getAll: 'get all post success',
  notFound: 'Post not found',
  notPermission: 'Your are permission to update or delete this post',
  validate: {
    fields: 'title, content, type must provided',
  },
};

export const likeMsg = {
  create: 'Create like success',
  delete: 'Remove like success',
  notFound: 'like not found',
};

export const shareMsg = {
  create: 'Share post success',
  delete: 'Delete share success',
  getById: 'Get share post by id success',
  getAllShare: 'List share post of user',
  notFound: 'Share not found',
  existedSharePost: 'This share post existed already',
  notPermission: 'Your are permission to delete or update this share',
};

export const qureryPagination = {
  validField: 'Page and limit must provided',
  validType: 'limit or page must is number',
};

export const followMsg = {
  create: 'Follow success',
  delete: 'Cancle Follow success',
  getAllFollow: 'Get all follow success',
};

export const groupMsg = {
  create: 'Create group success',
  update: 'Update group success',
  delete: 'Delete group success',
  getById: 'Get group by id success',
  getAll: 'Get all group success',
  notFound: 'Group not found',
  notPermission: 'Your are permission to delete or update this group',
  addMembers: 'Add more members success',
};

export const topicMsg = {
  create: 'Create topic success',
  notFoud: 'Topic not found',
  getById: 'Get topic by id success',
  notPermission: 'Your are permission to create or delete or update topic',
};

export const problemMsg = {
  create: 'Create problem success',
  notFoud: 'Problem not found',
};

export const solutionMsg = {
  create: 'Create solution success',
  delete: 'Delete solution success',
  update: 'Update solution success',
  notFound: 'Solution not found',
  notPermission: 'Your are permission to delete or update this solution',
};

export const commentMsg = {
  create: 'Create comment success',
  delete: 'Delete comment success',
  update: 'Update comment success',
  notFound: 'Comment not found',
  notPermission: 'Your are permission to delete or update this comment',
};
