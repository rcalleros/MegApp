import {Request, Response} from 'express';
import {IUser} from '../types/IUser';
import {deleteItemById, getItemById, insertIntoDB, updateItemById} from '../database/QueryDB';
import {UserModel} from './UserModel';
import {DBTables} from '../types/DBTables';
export const UserRoutesConfig = [
  {
    route: '/user/:id',
    requestMethod: 'get',
    routeCallback: (req: Request, res: Response) => {
      if (req.params.id) {
        getItemById(req.params.id, res, DBTables.Users);
        return;
      }
    },
  },
  {
    route: '/user',
    requestMethod: 'post',
    routeCallback: (req: Request, res: Response) => {
      console.log('request', req.body);
      const model: IUser = new UserModel();
      const optionalFields = ['id'];
      insertIntoDB(req.body, model, res, DBTables.Users, optionalFields);
      return;
    },
  },
  {
    route: '/user',
    requestMethod: 'put',
    routeCallback: (req: Request, res: Response) => {
      console.log('request', req.body);
      const model: IUser = new UserModel();
      updateItemById(req.body, model, res, DBTables.Users);
      return;
    },
  },
  {
    route: '/user',
    requestMethod: 'delete',
    routeCallback: (req: Request, res: Response) => {
      console.log('request', req.body);
      deleteItemById(req.body.id, res, DBTables.Users);
      return;
    },
  },
];
