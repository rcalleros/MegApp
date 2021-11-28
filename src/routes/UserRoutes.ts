import {UserRoutesConfig} from '../User/UserRoutesConfig';
import {IMegApplication} from '../types/IMegApplication';

const Routes = UserRoutesConfig;

export const UserRoutes = (app: IMegApplication) => {
  for (let x = 0; x < Routes.length; x = x + 1) {
    app[Routes[x].requestMethod](Routes[x].route, Routes[x].routeCallback);
  }
};
