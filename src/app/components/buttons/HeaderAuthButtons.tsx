'use client'

import { useSession } from 'next-auth/react'
import StravaButton from './SignInButton'
import SignOutButton from './SignOutButton'

export default function HeaderAuthButtons() {
  const { data: session, status } = useSession()
  return status === 'loading' ? null : (
    <div className="flex items-center justify-end">
      {session ? <SignOutButton /> : <StravaButton />}
    </div>
  )
}
