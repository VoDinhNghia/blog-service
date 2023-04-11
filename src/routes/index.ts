import { Router } from 'express';
import auth from './auth.route';
import user from './user.route';
import post from './post.route';
import like from './like.route';
import share from './share.route';
import follow from './follow.route';
import group from './group.route';
import topic from './topic.route';
import problem from './problem.router';
import solution from './solution.route';
import comment from './comment.route';

const routes = Router();

routes.use('/api/auth', auth);
routes.use('/api/user', user);
routes.use('/api/post', post);
routes.use('/api/like', like);
routes.use('/api/share', share);
routes.use('/api/follow', follow);
routes.use('/api/group', group);
routes.use('/api/topic', topic);
routes.use('/api/problem', problem);
routes.use('/api/solution', solution);
routes.use('/api/comment', comment);

export default routes;
