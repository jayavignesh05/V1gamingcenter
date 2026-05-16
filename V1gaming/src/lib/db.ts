import mysql from 'mysql2/promise';

const rawUrl = process.env.DATABASE_URL || 'mysql://tZDcGscpTcnseS5.root:qUbFv8g1jZ7OXxhL@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/gaming_center';
// Extract base URI without the SSL query params which cause parsing errors
const baseUri = rawUrl.split('?')[0];

const globalForDb = global as unknown as { pool: mysql.Pool | undefined };

export const pool =
  globalForDb.pool ??
  mysql.createPool({
    uri: baseUri,
    ssl: {
      rejectUnauthorized: true,
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

if (process.env.NODE_ENV !== 'production') globalForDb.pool = pool;

// A simple utility to initialize the reservations table if it doesn't exist
export async function initDb() {
  const query = `
    CREATE TABLE IF NOT EXISTS reservations (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      customer_name VARCHAR(255) NOT NULL,
      phone_number  VARCHAR(50)  NOT NULL,
      booking_date  DATE         NOT NULL,
      time_slot     VARCHAR(100) NOT NULL,
      console_id    VARCHAR(50)  NOT NULL,
      station_id    VARCHAR(20)  NOT NULL DEFAULT 'Station 1',
      players       INT          NOT NULL DEFAULT 1,
      created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY unique_station_booking (booking_date, console_id, station_id, time_slot)
    );
  `;
  try {
    await pool.query(query);
    console.log("Reservations table initialized.");
  } catch (err) {
    console.error("Error initializing reservations table:", err);
  }
}

// Auto-initialize (in a real app, you'd run this via a separate migration script)
initDb();

export default pool;
