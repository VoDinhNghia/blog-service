import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './entities/user.entity';
import { Attachments } from './entities/attachment.entity';
import { Comments } from './entities/comment.entity';
import { Conversations } from './entities/conversation.entity';
import { Follows } from './entities/follow.entity';
import { Labels } from './entities/label.entity';
import { Likes } from './entities/like.entity';
import { Messages } from './entities/message.entity';
import { Posts } from './entities/post.entity';
import { Shares } from './entities/share.entity';
import { StudyGroupMembers } from './entities/study-group-member.entity';
import { StudyGroups } from './entities/study-group.entity';
import { StudyProblems } from './entities/study-problem.entity';
import { StudySolutions } from './entities/study-solution.entity';
import { StudyTopics } from './entities/study-topic.entity';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Attachments,
    Comments,
    Conversations,
    Follows,
    Labels,
    Likes,
    Messages,
    Posts,
    Shares,
    StudyGroupMembers,
    StudyGroups,
    StudyProblems,
    StudySolutions,
    StudyTopics,
  ],
  migrations: [],
  subscribers: [],
});
