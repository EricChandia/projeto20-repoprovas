import express, { json } from 'express';
import 'express-async-errors';

import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import handleErrorsMiddleware from './middlewares/handleErrorsMiddleware';
import router from './routes/routes';

const app = express();
app.use(json());
app.use(router);
app.use(handleErrorsMiddleware);

export default app;