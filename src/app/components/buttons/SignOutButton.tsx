import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition"
    >
      Sign out
    </button>
  )
}
