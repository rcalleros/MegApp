import connect from '../database/connection';
import {IUser} from '../types/IUser';

export const createUser = (User: IUser) => {
  const con: any = connect();
  con.connect((err: any) => {
    if (err) {
      throw err;
    }
    console.log('yass queen');
  });
  con.end();
};

export const getUser = (id: string) => {
  const con = connect();
  con.connect((err: any) => {
    if (err) {
      throw err;
    }
    console.log('yass queen');
  });
  con.end();
  return {firstName: 'test'};
};
