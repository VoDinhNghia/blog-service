import { Router } from 'express';
import auth from './auth.route';
import user from './user.route';
import post from './post.route';

const routes = Router();

routes.use('/api/auth', auth);
routes.use('/api/user', user);
routes.use('/api/post', post);

export default routes;
