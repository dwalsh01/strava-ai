import { StravaActivity } from '../types/stravaActivity'

export default function getOutliersIQR(
  activities: StravaActivity[],
  key: {
    [K in keyof StravaActivity]: StravaActivity[K] extends number ? K : never
  }[keyof StravaActivity]
) {
  const values = activities.map((a) => a[key])

  const sorted = [...values].sort((a, b) => a - b)
  const q1 = sorted[Math.floor(sorted.length * 0.25)]
  const q3 = sorted[Math.floor(sorted.length * 0.75)]
  const iqr = q3 - q1
  const lower = q1 - 1.5 * iqr
  const upper = q3 + 1.5 * iqr

  return activities
    .map((a) => ({
      ...a,
      isOutlier: a[key] < lower || a[key] > upper,
    }))
    .filter((activity) => activity.isOutlier)
}
