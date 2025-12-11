import express, { type Express } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/middleware.js';
import router from './routes/routes.js';

const app: Express = express();
const PORT: number = process.env.API_PORT ? parseInt(process.env.API_PORT) : 8080;

app.use(cors(
    { 
        credentials: true, 
        origin: ['https://mock-ntu-wes-sg.web.app', 'http://localhost:5173'], 
        allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
    }
));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
}

export default app;