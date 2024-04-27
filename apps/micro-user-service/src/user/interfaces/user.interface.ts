import { User } from '../models/user.model';

export interface IFetchUsers {
  users: User[];
}

export interface IFindUser {
  phone: string;
  email: string;
}
