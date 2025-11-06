import express from 'express';
import type { Request, Response } from 'express';
import pool from './database.ts';
import type { Feature } from './nanyang.ts';

const app = express();
const PORT = 3000;

// Function to get all features.
app.get('/api/features', async (req: Request, res: Response) => {
    const q: string = 'SELECT ft_name, ft_view FROM feature';
    try {
        const [rows, _fields] = await pool.query<Feature[]>(q);

        res.status(200).send(rows);
    } catch (error) {
        console.error('Error fetching features:', error);
        res.status(500).send('Database query failed');
    }
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
