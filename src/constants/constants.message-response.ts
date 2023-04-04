export const serverError = 'Server error';
export const authMsg = {
  login: 'Login success',
  invalid: 'Email or password incorect',
  badRequest: 'Email and password must provided',
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
  getById: 'Get post by id success',
  getAll: 'get all post success',
  validate: {
    fields: 'title, content, type must provided',
  },
};
