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
import { eq } from 'drizzle-orm';

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
    async signIn({ user }) {
      // Only allow users that exist in the database (no self-registration)
      if (!user.email) return false;

      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, user.email),
      });

      // Deny sign-in if user doesn't exist (no self-registration)
      if (!existingUser) {
        return false;
      }

      return true;
    },
  },
});
