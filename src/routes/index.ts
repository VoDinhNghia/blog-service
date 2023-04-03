import { Router } from 'express';
import auth from './auth.route';
import user from './user.route';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);

export default routes;
