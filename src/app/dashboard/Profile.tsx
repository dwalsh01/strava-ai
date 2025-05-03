'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Profile() {
  const { data: session, status } = useSession()
  if (status === 'loading') return null
  const athlete = session?.athlete
  if (!athlete) return null
  return (
    <div className="relative flex flex-col items-center bg-white rounded-sm p-4">
      <Image
        className="rounded-full top-0 -translate-y-1/2"
        src={athlete?.profile}
        width={100}
        height={100}
        alt={'profile image'}
      />
      <h4 className="-mt-12 text-2xl font-semibold pt-2">
        {athlete?.firstname} {athlete?.lastname}
      </h4>
      <div>
        Member since: {new Date(athlete.created_at).toLocaleDateString()}
      </div>
    </div>
  )
}
