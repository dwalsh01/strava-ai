export default function convertToPace({
  movingTimeInSeconds,
  distanceInMeters,
}: {
  movingTimeInSeconds: number
  distanceInMeters: number
}): string {
  // Calculate the pace per kilometer
  const pacePerKilometerInSeconds =
    (movingTimeInSeconds * 1000) / distanceInMeters

  // Calculate the pace in minutes and seconds per kilometer
  const paceMinutes = Math.floor(pacePerKilometerInSeconds / 60)
  const paceSeconds = Math.round(pacePerKilometerInSeconds % 60)

  // Return the formatted pace in minutes:seconds per kilometer
  return `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')} per km`
}
