export interface Iusers {
  id?: string;
  email?: string;
  password?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IcreateUser {
  email?: string;
  password?: string;
  role?: string;
}

export interface IuserMigrate {
  email?: string;
  _id?: string;
  passWord?: string;
  isDeleted?: boolean;
  status?: string;
  role?: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    code?: string;
    _id?: string;
    avatar?: string;
    mobile?: string;
  };
}
