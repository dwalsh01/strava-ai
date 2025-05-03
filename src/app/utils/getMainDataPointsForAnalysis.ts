import { StravaActivity, MainActivityDataPoints } from '../types/stravaActivity'

// overloads
export default function getMainDataPointsForAnalysis(
  activities: StravaActivity[]
): MainActivityDataPoints[]
export default function getMainDataPointsForAnalysis(
  activities: StravaActivity
): MainActivityDataPoints

export default function getMainDataPointsForAnalysis(
  activities: StravaActivity | StravaActivity[]
): MainActivityDataPoints | MainActivityDataPoints[] {
  const getMainDataPoints = (act: StravaActivity) => ({
    distance: act.distance,
    moving_time: act.moving_time,
    average_speed: act.average_speed,
    total_elevation_gain: act.total_elevation_gain,
    average_heartrate: act.has_heartrate ? act.average_heartrate : 0,
    weighted_average_watts: act.device_watts ? act.weighted_average_watts : 0,
    average_cadence: isFinite(act.average_cadence) ? act.average_cadence : 0,
    pr_count: act.pr_count,
    achievement_count: act.achievement_count,
    trainer: act.trainer,
    sport_type: act.sport_type,
    start_date_local: act.start_date_local,
  })

  return Array.isArray(activities)
    ? activities.map(getMainDataPoints)
    : getMainDataPoints(activities)
}
