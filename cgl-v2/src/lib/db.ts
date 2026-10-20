import mysql from 'mysql2/promise';

declare global {
  // eslint-disable-next-line no-var
  var _cglMysqlPool: mysql.Pool | undefined;
}

const pool = global._cglMysqlPool || mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'cgl_root_secure_2026',
  database: process.env.DB_NAME || 'cgl_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

if (process.env.NODE_ENV !== 'production') {
  global._cglMysqlPool = pool;
}

export default pool;

export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const [results] = await pool.execute(sql, params);
  return results as T;
}
