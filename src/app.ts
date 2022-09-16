import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import testRoutes from './routes/testRoutes.js';

const app = express();

app.use(cors());
app.use(json());
app.use(authRoutes);
app.use(testRoutes);
app.use(errorHandlerMiddleware);

export default app;
