import { signIn } from 'next-auth/react'

export default function StravaButton() {
  return (
    <button
      className="cursor-pointer bg-[#FC4C02] hover:bg-[#e04502] text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-200"
      onClick={() => signIn('strava', { callbackUrl: '/dashboard' })}
    >
      Sign in
    </button>
  )
}
