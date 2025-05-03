// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession, Account as DefaultAccount } from 'next-auth'
import { DefaultJWT } from '@auth/core/jwt'

interface Athelete {
  id: string
  username: string | null
  firstname: string
  lastname: string
  bio: string | null
  city: string | null
  state: string | null
  country: string | null
  created_at: string
  updated_at: string
  weight: null
  profile_medium: string
  profile: string
}

declare module 'next-auth' {
  // Extend session to hold the access_token
  interface Session extends DefaultSession {
    access_token?: string
    athlete?: Athelete
  }
  interface Account extends DefaultAccount {
    athlete?: Athelete
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    /** OpenID ID Token */
    access_token?: string
    athlete?: Athelete
  }
}
