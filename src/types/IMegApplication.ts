import {Application} from 'express';
export interface IMegApplication extends Application {
  [key: string]: any;
}
