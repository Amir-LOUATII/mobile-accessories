import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Resend from 'next-auth/providers/resend';
import { db } from '@/lib/db';
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    verifyRequest: '/login/verify',
    error: '/login/error',
  },
  providers: [
    Resend({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // First sign-in: fetch role from DB
        const dbUser = await db.query.users.findFirst({
          where: eq(users.id, user.id!),
        });
        token.role = dbUser?.role || 'customer';
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'admin' | 'seller' | 'customer';
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log("[Auth SignIn Attempt] user:", user);
      
      // Only allow users that exist in the database (no self-registration)
      if (!user.email) {
        console.log("[Auth SignIn] Denied: No email provided in user object");
        return false;
      }

      console.log("[Auth SignIn] user email:", user.email);
      
      const cleanEmail = user.email.trim().toLowerCase();

      // Check case-insensitive
      const existingUser = await db.query.users.findFirst({
        where: eq(sql`lower(${users.email})`, cleanEmail),
      });

      console.log("[Auth SignIn] existingUser found:", existingUser);

      // Deny sign-in if user doesn't exist (no self-registration)
      if (!existingUser) {
        // Log what we have in DB to debug
        const allUsers = await db.query.users.findMany({ columns: { email: true }});
        console.log("[Auth SignIn] Denied: User not found in DB. Available emails:", allUsers.map(u => u.email));
        return false;
      }

      return true;
    },
  },
});
