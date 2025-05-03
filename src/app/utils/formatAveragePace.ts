import { calculateAveragePace } from './calculatePace'

export default function formatAveragePace({
  movingTimeInSeconds,
  distanceInMeters,
}: {
  movingTimeInSeconds: number
  distanceInMeters: number
}): string {
  const { paceMinutes, paceSeconds } = calculateAveragePace(
    movingTimeInSeconds,
    distanceInMeters
  )
  // Return the formatted pace in minutes:seconds per kilometer
  return `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')} per km`
}
