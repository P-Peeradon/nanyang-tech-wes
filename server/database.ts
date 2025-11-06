import { createPool } from 'mysql2/promise';
import type { Pool, PoolOptions } from 'mysql2/promise';

// 1. Configure Connection Options
const access: PoolOptions = {
    host: 'localhost',
    user: 'nanyang60',
    password: 'ntusg60',
    database: 'nanyang_stars',
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
