import express, { type Express } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/middleware.js';
import router from './routes/routes.js';

const app: Express = express();
const PORT: number = 3000;

app.use(cors(
    { 
        credentials: true, 
        origin: ['http://localhost:5173'], 
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    }
));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
