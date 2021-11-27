import {Application} from 'express';
import {getUser} from '../User/User';
export const UserRoutes = (app: Application) => {
  app.get('/user/:id', (req, res) => {
    if (req.params.id) {
      const user = getUser(req.params.id);
      res.send(user);
      return;
    }
  });
};
