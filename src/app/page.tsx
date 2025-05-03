'use client'

import { useSession } from 'next-auth/react'
import SignInButton from './components/buttons/SignInButton'
import { redirect } from 'next/navigation'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="text-gray-900">Loading...</div>
  }

  if (session && session.access_token) {
    // Redirect to the dashboard if the user is already authenticated
    redirect('/dashboard')
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Strava AI
      </h2>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <SignInButton />
        </div>
      </main>
    </div>
  )
}
