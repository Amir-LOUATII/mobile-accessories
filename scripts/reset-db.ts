import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

async function resetDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = neon(process.env.DATABASE_URL);

  console.log('⚠️  Dropping all tables and types...\n');

  // Drop tables in correct order (respecting foreign keys)
  await sql`DROP TABLE IF EXISTS verification_tokens CASCADE`;
  await sql`DROP TABLE IF EXISTS sessions CASCADE`;
  await sql`DROP TABLE IF EXISTS accounts CASCADE`;
  await sql`DROP TABLE IF EXISTS order_items CASCADE`;
  await sql`DROP TABLE IF EXISTS orders CASCADE`;
  await sql`DROP TABLE IF EXISTS wholesale_prices CASCADE`;
  await sql`DROP TABLE IF EXISTS products CASCADE`;
  await sql`DROP TABLE IF EXISTS categories CASCADE`;
  await sql`DROP TABLE IF EXISTS users CASCADE`;

  // Drop enums
  await sql`DROP TYPE IF EXISTS user_role CASCADE`;
  await sql`DROP TYPE IF EXISTS order_status CASCADE`;

  console.log('✅ All tables and types dropped successfully!');
  console.log('👉 Now run: npm run db:push');
}

resetDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Reset failed:', err);
    process.exit(1);
  });
