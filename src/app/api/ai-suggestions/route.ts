import { auth } from '@/app/api/auth/[...nextauth]/authOptions'
import { getActivities } from '@/app/lib/strava'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { formatActivitiesForAI } from './helpers/formatActivitiesForAI'
import { cache } from '@/app/lib/aiCache'

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
    const firstActivity = activities[0]
    if (firstActivity) {
      const cached = cache.get(`strava/ai-response/${firstActivity.id}`)
      if (cached) {
        return NextResponse.json({ response: cached }, { status: 200 })
      }
    }
    // Step 4: Prepare summary for AI
    const formatted = formatActivitiesForAI(activities)

    // Step 5: Send to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `
          You're a friendly, expert running coach.
          Using the athlete’s training data, respond with helpful, encouraging feedback. Keep responses brief, under 120 words.
          Respond with:
          ## Summary
          - 3–5 short bullet points identifying key trends or patterns
          - Each bullet starts with 1 emoji
          ## Suggestions
          - 2–3 positive training tips based on trends or outliers
          - Keep tone supportive, clear, and actionable
          - Each bullet starts with 1 emoji
          ## Suggested Workout
          - 1 workout tailored to current fitness level
          - Simple, realistic, and effective
          Use all data provided by the athlete in your analysis.
          `,
        },
        {
          role: 'user',
          content: `Here are my recent activity data:\n\n${JSON.stringify(formatted, null, 2)}\n\n`,
        },
      ],
    })

    const suggestion = response.choices[0].message.content
    if (suggestion) {
      cache.set(`strava/ai-response/${firstActivity.id}`, suggestion)
    }
    return NextResponse.json({ suggestion })
  } catch (error) {
    console.error('AI suggestion error:', error)
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    )
  }
}
