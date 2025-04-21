import { auth } from '@/app/api/auth/[...nextauth]/authOptions'
import { getActivities } from '@/app/lib/strava'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function GET(req: NextRequest) {
  // Step 1: Authenticate the user
  const session = await auth()
  if (!session || !session.access_token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Step 2: Parse pagination
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10)
  const perPage = parseInt(req.nextUrl.searchParams.get('per_page') || '30', 10)

  try {
    // Step 3: Fetch activities using shared Strava fetcher
    const activities = await getActivities({
      accessToken: session.access_token,
      page,
      perPage,
    })

    // Step 4: Prepare summary for AI
    const formatted = activities.map((a) => ({
      name: a.name,
      distance_km: (a.distance / 1000).toFixed(2),
      duration_min: (a.moving_time / 60).toFixed(1),
      pace_min_per_km: (a.moving_time / (a.distance / 1000) / 60).toFixed(2),
      avg_heart_rate: a.average_heartrate,
      elevation_gain_m: a.total_elevation_gain,
      date: new Date(a.start_date_local).toLocaleDateString(),
    }))

    // Step 5: Send to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert AI running coach. You provide personalized feedback based on the user's recent activities. Keep it concise and motivational.`,
        },
        {
          role: 'user',
          content: `Here are my recent runs:\n\n${JSON.stringify(formatted, null, 2)}\n\nPlease analyze the trends and give 3-4 key takeaways, and suggestions for improvement in the next weeks training.`,
        },
      ],
    })

    const suggestion = response.choices[0].message.content

    return NextResponse.json({ suggestion })
  } catch (error) {
    console.error('AI suggestion error:', error)
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    )
  }
}
