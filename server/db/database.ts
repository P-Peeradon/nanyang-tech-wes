import mysql, { createPool, type Pool, type PoolOptions } from 'mysql2/promise.js';
import 'dotenv/config'

// 1. Configure Connection Options
const access: PoolOptions = {
    user: process.env.MYSQL_USER ?? '',
    password: process.env.MYSQL_PASSWORD ?? '',
    database: process.env.MYSQL_DATABASE ?? '',
    timezone: '+08:00'
}

// Check if running on App Engine in production AND the secure connection name is available
if (process.env.NODE_ENV === 'production' && process.env.CLOUD_SQL_CONNECTION_NAME) {
    // *** FIX: Use socketPath for secure internal connection ***
    access.socketPath = `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`;
} else {
    // Local development/testing (using Auth Proxy or local MySQL server)
    access.host = process.env.MYSQL_HOST ?? 'localhost'; 
}

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
