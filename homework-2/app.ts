import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { initialLogMiddleware } from "./middewares/initialLogMiddleware";
import { executionTimeLogMiddleware } from "./middewares/executionTimeLogMiddleware";
import { authRouter, groupRouter, userRouter } from "./routes";
import { errorHandler } from "./middewares/errorMiddleware";

const app: Application = express();
const corsOptions = {
    origin: `http://localhost`,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(initialLogMiddleware);
app.use(executionTimeLogMiddleware);

app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/group', groupRouter);

app.use(errorHandler);

export default app;
