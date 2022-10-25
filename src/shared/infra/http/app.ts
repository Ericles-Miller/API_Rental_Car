import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import 'dotenv/config';
import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import { router } from './routes';

import '@shared/container';

createConnection();
const app = express();
app.use(express.json());

/* rota responsavel por descrever a doc da API
   swagger.UI cria um servidor para acessar a doc
   swagger.Ui.setup cria um arquivo em json */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

/* middle error */
app.use((err:Error, request:Request, response:Response, next:NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }
  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
