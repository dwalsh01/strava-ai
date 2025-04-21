// API Route — Proxy to Strava API (for secure, paginated fetches)
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/app/api/auth/[...nextauth]/authOptions'

import { getActivities } from '@/app/lib/strava'

export async function GET(req: NextRequest) {
  const session = await auth()
  const page = req.nextUrl.searchParams.get('page') || '1'
  const perPage = req.nextUrl.searchParams.get('per_page') || '30'

  if (!session?.access_token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const activities = await getActivities({
      accessToken: session.access_token,
      page: parseInt(page),
      perPage: parseInt(perPage),
    })
    return NextResponse.json(activities)
  } catch (_e: unknown) {
    return NextResponse.json(
      { error: 'Failed to fetch Strava data' },
      { status: 400 }
    )
  }
}
