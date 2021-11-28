import {IUser} from '../types/IUser';

export class UserModel implements IUser {
  firstname = '';
  lastname = '';
  email = '';
  id = 0;
}
