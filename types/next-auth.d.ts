import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'admin' | 'seller' | 'customer';
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: 'admin' | 'seller' | 'customer';
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id?: string;
    role?: 'admin' | 'seller' | 'customer';
  }
}
