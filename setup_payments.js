import { query } from './lib/db.js';

async function setup() {
  await query(`
    CREATE TABLE IF NOT EXISTS payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_mobile VARCHAR(15) NOT NULL,
      plan VARCHAR(100) NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      transaction_id VARCHAR(100) UNIQUE NOT NULL,
      status VARCHAR(20) DEFAULT 'PENDING',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Payments table created successfully!');
  process.exit(0);
}
setup().catch(console.error);
