import express, { type Express } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/middleware.ts';
import router from './routes/routes.ts';

const app: Express = express();
const PORT: number = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: ['http://localhost:5173']}));

app.use('/api', router);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
