import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from '../lib/db/schema';
import { eq } from 'drizzle-orm';

async function seedAdmin() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminName = process.env.ADMIN_NAME || 'Admin';

  if (!adminEmail) {
    throw new Error(
      'ADMIN_EMAIL is not set. Add it to your .env.local file.'
    );
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  // Check if admin already exists
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, adminEmail))
    .limit(1);

  if (existing.length > 0) {
    console.log(`✅ Admin user already exists: ${adminEmail}`);
    console.log(`   Role: ${existing[0].role}`);
    return;
  }

  // Create admin user
  const [admin] = await db
    .insert(users)
    .values({
      email: adminEmail,
      name: adminName,
      role: 'admin',
    })
    .returning();

  console.log(`🎉 Admin user created successfully!`);
  console.log(`   Name:  ${admin.name}`);
  console.log(`   Email: ${admin.email}`);
  console.log(`   Role:  ${admin.role}`);
  console.log(`   ID:    ${admin.id}`);
  console.log('');
  console.log(`👉 Go to /login and sign in with ${adminEmail}`);
}

seedAdmin()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  });
