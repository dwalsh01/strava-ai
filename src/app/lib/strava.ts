import { StravaActivity } from '../types/stravaActivity'
import activitiesJson from './activities.json'

interface GetActivitiesProps {
  accessToken: string
  page?: number
  perPage?: number
}

const SHOULD_SKIP = false // process.env.NODE_ENV === 'development'

export async function getActivities({
  accessToken,
  page = 1,
  perPage = 30,
}: GetActivitiesProps): Promise<StravaActivity[]> {
  if (SHOULD_SKIP) {
    return activitiesJson
  }
  // Get current date and the date 30 days ago
  const currentDate = new Date()
  const thirtyDaysAgo = new Date(currentDate)
  thirtyDaysAgo.setDate(currentDate.getDate() - 30)

  // Convert dates to Unix timestamps (in seconds)
  const after = Math.floor(thirtyDaysAgo.getTime() / 1000) // 30 days ago
  const before = Math.floor(currentDate.getTime() / 1000) // Now

  const res = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?after=${after}&before=${before}&page=${page}&per_page=${perPage}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  if (!res.ok) {
    throw new Error('Failed to fetch activities')
  }

  return (await res.json()) as StravaActivity[]
}
