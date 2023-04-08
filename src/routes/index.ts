import { Router } from 'express';
import auth from './auth.route';
import user from './user.route';
import post from './post.route';
import like from './like.route';
import share from './share.route';
import follow from './follow.route';

const routes = Router();

routes.use('/api/auth', auth);
routes.use('/api/user', user);
routes.use('/api/post', post);
routes.use('/api/like', like);
routes.use('/api/share', share);
routes.use('/api/follow', follow);

export default routes;
