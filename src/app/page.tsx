'use client'

import SignInButton from './components/buttons/SignInButton'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
        Strava AI Coach
      </h2>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <SignInButton />
        </div>
      </main>
    </div>
  )
}
