import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { NotFoundError, ApiError, InternalError } from './core/ApiError';
import {taskRouter} from './routes/v1/task';
import { tasklistRouter } from './routes/v1/tasklist';
import { getEnv } from './env';
import serverless from 'serverless-http';
import iconv from 'iconv-lite';
//@ts-ignore
import encodings from 'iconv-lite/encodings';

process.on('uncaughtException', (e) => {
  console.error(e.message);
});

const app = express();
//@ts-ignore
iconv.encodings = encodings;


app.set("port", process.env.PORT || 3001);

app.get("/", (req, res) => {
  res.json({ status: "up" })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

// Routes
app.use('/v1/tasks', taskRouter);
app.use('/v1/tasklists', tasklistRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
//@ts-ignore
app.use((err: Error, _req: Request, res: Response) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (getEnv().NODE_ENV === 'development') {
      console.error(err.message);
      return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
export const handler = serverless(app);

//module.exports.handler = serverless(app);


