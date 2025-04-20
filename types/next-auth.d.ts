// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from 'next-auth'
import { DefaultJWT } from '@auth/core/jwt'

declare module 'next-auth' {
  // Extend session to hold the access_token
  interface Session extends DefaultSession {
    access_token?: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    /** OpenID ID Token */
    access_token?: string
  }
}
