import {
  StravaActivity,
  MainActivityDataPoints,
} from '@/app/types/stravaActivity'
import getMainDataPointsForAnalysis from '@/app/utils/getMainDataPointsForAnalysis'
import getOutliersIQR from '@/app/utils/getOutliersIQR'

export interface AIFormat {
  averageMetrics: {
    averageSpeedinMinPerKm: string
    averageHeartRate: number
    averageCadence: number
    averageDistanceInKm: number
    averageElevationGainInMeters: number
    trainingFrequencyPerWeek: number
  }
  outliers: {
    distanceOutliers: MainActivityDataPoints[]
    hrOutliers: MainActivityDataPoints[]
    cadenceOutliers: MainActivityDataPoints[]
    speedOutliers: MainActivityDataPoints[]
  }
  longestActivity: MainActivityDataPoints
  recentActivities: MainActivityDataPoints[]
}

export const formatActivitiesForAI = (
  activities: StravaActivity[]
): AIFormat => {
  const longestActivity = findLongestActivity(activities)
  const recentActivities = findRecentActivities(activities)
  return {
    averageMetrics: {
      averageSpeedinMinPerKm: calculateAverageSpeedinMinPerKm(activities),
      averageHeartRate: calculateAverageHeartRate(activities),
      averageCadence: calculateAverageCadence(activities),
      averageDistanceInKm: calculateAverageDistanceInKm(activities),
      averageElevationGainInMeters:
        calculateAverageElevationGainInMeters(activities),
      trainingFrequencyPerWeek: calculateTrainingFrequencyPerWeek(activities),
    },
    outliers: findOutliers(activities),
    longestActivity,
    recentActivities,
  }
}
function calculateAverageSpeedinMinPerKm(activities: StravaActivity[]): string {
  const totalPacePerKmInSeconds = activities.reduce((_, curr) => {
    return (curr.moving_time * 1000) / curr.distance
  }, 0)
  const average = totalPacePerKmInSeconds / activities.length
  const paceMinutes = Math.floor(average / 60)
  const paceSeconds = Math.round(average % 60)
  return `${paceMinutes}:${paceSeconds}/km`
}

function calculateAverageHeartRate(activities: StravaActivity[]): number {
  const totalHeartRate = activities.reduce(
    (acc, activity) => acc + activity.average_heartrate,
    0
  )
  return totalHeartRate / activities.length
}

function calculateAverageCadence(activities: StravaActivity[]): number {
  const totalCadence = activities.reduce(
    (acc, activity) => acc + activity.average_cadence,
    0
  )
  return totalCadence / activities.length
}

function calculateAverageDistanceInKm(activities: StravaActivity[]): number {
  const totalDistance = activities.reduce(
    (acc, activity) => acc + activity.distance / 1000,
    0
  )
  return totalDistance / activities.length
}

function findLongestActivity(activities: StravaActivity[]) {
  return getMainDataPointsForAnalysis(
    activities.reduce((prev, curr) => {
      return prev.distance > curr.distance ? prev : curr
    })
  )
}

function findOutliers(activities: StravaActivity[]) {
  return {
    distanceOutliers: getMainDataPointsForAnalysis(
      getOutliersIQR(activities, 'distance')
    ),
    hrOutliers: getMainDataPointsForAnalysis(
      getOutliersIQR(activities, 'average_heartrate')
    ),
    cadenceOutliers: getMainDataPointsForAnalysis(
      getOutliersIQR(activities, 'average_cadence')
    ),
    speedOutliers: getMainDataPointsForAnalysis(
      getOutliersIQR(activities, 'average_speed')
    ),
  }
}

function findRecentActivities(activities: StravaActivity[]) {
  return getMainDataPointsForAnalysis(activities.slice(0, 10))
}
function calculateAverageElevationGainInMeters(activities: StravaActivity[]) {
  const totalElevationGain = activities.reduce(
    (acc, activity) => acc + activity.total_elevation_gain,
    0
  )
  return totalElevationGain / activities.length
}
function calculateTrainingFrequencyPerWeek(activities: StravaActivity[]) {
  if (activities.length === 0) {
    return 0
  }
  // Parse dates and group by ISO week number (YYYY-WW)
  const weekSet = new Set<string>()

  for (const activity of activities) {
    const date = new Date(activity.start_date)
    const year = date.getUTCFullYear()

    // Get week number using ISO week (Monday-starting)
    const jan4 = new Date(Date.UTC(year, 0, 4))
    const dayOfYear = Math.floor((+date - +jan4) / (1000 * 60 * 60 * 24))
    const jan4Day = jan4.getUTCDay() || 7
    const weekNumber = Math.ceil((dayOfYear + jan4Day) / 7)

    weekSet.add(`${year}-W${weekNumber}`)
  }

  const weeksTrained = weekSet.size
  return weeksTrained === 0 ? 0 : activities.length / weeksTrained
}
