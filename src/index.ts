import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppDataSource } from './data-source';
import * as cors from 'cors';
import routes from './routes';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as cron from 'node-cron';
import { CronJobService } from './utils/utils.cronjob.sync-user';
import { whiteLists } from './configs/configs.cors.white-list';
dotenv.config();

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(cors({ origin: whiteLists }));
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.static(__dirname + '/public'));
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/', routes);
    cron.schedule('0 20 * * * *', () => {
      void new CronJobService().syncUserFromBackend();
    });
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
