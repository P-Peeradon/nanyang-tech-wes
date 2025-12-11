import mysql, { createPool, type Pool, type PoolOptions } from 'mysql2/promise.js';
import 'dotenv/config.js';

// 1. Configure Connection Options
const access: PoolOptions = {
    host: process.env.MYSQL_HOST ?? '',
    user: process.env.MYSQL_USER ?? '',
    password: process.env.MYSQL_PASSWORD ?? '',
    database: process.env.MYSQL_DATABASE ?? '',
    socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`
};

// 2. Create the Connection Pool
let pool: Pool;
try {
    pool = createPool(access);
    console.log('✅ MySQL Pool created successfully.');
} catch (error) {
    console.error('❌ Failed to create MySQL Pool:', error);
    process.exit(1);
}

// 3. Export the pool instance
export default pool;
