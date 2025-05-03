import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import StravaProvider from 'next-auth/providers/strava'

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.access_token = account.access_token
      }
      if (account?.athlete) {
        token.athlete = account.athlete
      }
      return token
    },
    async session({ session, token }) {
      if (token.access_token) {
        session.access_token = token.access_token
      }
      if (token.athlete) {
        session.athlete = token.athlete
      }

      return session
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`
    },
  },
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_CLIENT_ID ?? '',
      clientSecret: process.env.STRAVA_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: 'read,activity:read_all', // 👈 important
          // approval_prompt: 'force', // 👈 to re-prompt even if previously authorized
        },
      },
    }),
  ],
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions)
}
