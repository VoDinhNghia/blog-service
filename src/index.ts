import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppDataSource } from './data-source';
import * as cors from 'cors';
import routes from './routes';
import helmet from 'helmet';
import * as dotenv from 'dotenv';

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/', routes);
    dotenv.config();
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
