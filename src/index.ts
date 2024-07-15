import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logger from './utils/logger.util';
import { errorHandler } from './api/v1/middlewares/errors.middleware';

mongoose.connect(config.mongodb.url, { retryWrites: true })
  .then(() => {
    Logger.info('MongoDB connected successfully.');
    startServer();
  })
  .catch((error) => Logger.error(error));

const startServer = () => {
  const app: Application = express();
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use('/', routes);

  app.use(errorHandler);

  app.listen(config.server.port, () => {
    Logger.log('Server start');
  });
};


