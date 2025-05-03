export function calculateAveragePace(
  movingTimeInSeconds: number,
  distanceInMeters: number
): {
  paceMinutes: number
  paceSeconds: number
} {
  // Calculate the pace per kilometer
  const pacePerKilometerInSeconds =
    (movingTimeInSeconds * 1000) / distanceInMeters

  // Calculate the pace in minutes and seconds per kilometer
  const paceMinutes = Math.floor(pacePerKilometerInSeconds / 60)
  const paceSeconds = Math.round(pacePerKilometerInSeconds % 60)
  return {
    paceMinutes,
    paceSeconds,
  }
}
