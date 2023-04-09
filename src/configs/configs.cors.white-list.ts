import * as cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

export const whiteLists = [
  process.env.LIBRARY,
  process.env.ATTENDANCE,
  process.env.ADMIN_FRONTEND,
  process.env.FRONTEND,
  process.env.LIBRARY_FRONTEND,
  process.env.MGT_STUDENT,
  process.env.BLOG_FRONTEND,
];

export const enableCors = (req, callback) => {
  const corsOptions = whiteLists.includes(req.header('Origin'))
    ? { origin: true }
    : { origin: false };
  callback(null, corsOptions);
};

export const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Authorization',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: whiteLists,
  preflightContinue: false,
};
