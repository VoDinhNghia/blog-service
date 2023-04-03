import { Router } from 'express';
import auth from './auth.route';
import user from './user.route';

const routes = Router();

routes.use('/api/auth', auth);
routes.use('/api/user', user);

export default routes;
