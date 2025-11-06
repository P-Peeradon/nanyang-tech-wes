import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Define a type for a more specific request body, if needed
// interface UserRequest extends Request {
//   body: { username: string };
// }

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TypeScript Express!');
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
