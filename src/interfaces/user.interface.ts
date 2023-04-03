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
