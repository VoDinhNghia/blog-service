import { Router } from 'express';
import auth from './auth.route';
import user from './user.route';
import post from './post.route';
import like from './like.route';
import share from './share.route';

const routes = Router();

routes.use('/api/auth', auth);
routes.use('/api/user', user);
routes.use('/api/post', post);
routes.use('/api/like', like);
routes.use('/api/share', share);

export default routes;
