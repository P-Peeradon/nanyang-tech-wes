import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Function to get all features.
app.get('/api/features', (req: Request, res: Response) => {});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
