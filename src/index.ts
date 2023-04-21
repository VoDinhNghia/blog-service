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
import { options } from './configs/configs.cors.white-list';
import { limitRequestConfig } from './configs/configs.rate-limit-request';
import { createServer } from 'http';
import Websocket from './socket/socket';
import MessageSocket from './socket/socket.message';
dotenv.config();

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(cors(options));
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.static(__dirname + '/public'));
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(limitRequestConfig);
    app.use('/', routes);
    cron.schedule('0 0 4,12,18,23 * * *', () => {
      void new CronJobService().syncUserFromBackend();
    });
    const httpServer = createServer(app);
    const io = Websocket.getInstance(httpServer);
    io.initializeHandlers([{ path: '/message', handler: new MessageSocket() }]);
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
