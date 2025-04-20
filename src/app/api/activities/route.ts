// API Route — Proxy to Strava API (for secure, paginated fetches)
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/app/api/auth/[...nextauth]/authOptions'

import activitiesJson from './activies.json'

const SHOULD_FETCH_DATA = false

export async function GET(req: NextRequest) {
  const session = await auth()
  const page = req.nextUrl.searchParams.get('page') || '1'
  const perPage = req.nextUrl.searchParams.get('per_page') || '5'

  if (!session?.access_token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!SHOULD_FETCH_DATA) {
    return NextResponse.json(activitiesJson.slice(0, 3))
  }

  const stravaRes = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${perPage}`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  )

  if (!stravaRes.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch Strava data' },
      { status: stravaRes.status }
    )
  }

  const data = await stravaRes.json()
  return NextResponse.json(data)
}
