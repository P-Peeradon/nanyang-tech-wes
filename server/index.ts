const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/middleware.ts');
const routes = require('./routes/routes.ts');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: ['http://localhost:5173']}));

app.use('/api', routes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
