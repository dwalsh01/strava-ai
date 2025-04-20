import { redirect } from 'next/navigation'

import { auth } from '@/app/api/auth/[...nextauth]/authOptions'
import ClientDashboard from './client'

export default async function Dashboard() {
  const session = await auth()

  if (!session || !session.access_token) {
    redirect('/')
  }

  return <ClientDashboard />
}
