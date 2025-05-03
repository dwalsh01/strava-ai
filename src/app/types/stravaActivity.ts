export interface StravaActivity {
  resource_state: number
  athlete: Athlete
  name: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  type: string
  sport_type: string
  workout_type: null
  id: number
  start_date: string
  start_date_local: string
  timezone: string
  utc_offset: number
  location_city: null
  location_state: null
  location_country: null
  achievement_count: number
  kudos_count: number
  comment_count: number
  athlete_count: number
  photo_count: number
  map: Map
  trainer: boolean
  commute: boolean
  manual: boolean
  private: boolean
  visibility: string
  flagged: boolean
  gear_id: null
  start_latlng: number[]
  end_latlng: number[]
  average_speed: number
  max_speed: number
  average_cadence: number
  average_watts: number
  max_watts: number
  weighted_average_watts: number
  device_watts: boolean
  kilojoules: number
  has_heartrate: boolean
  average_heartrate: number
  max_heartrate: number
  heartrate_opt_out: boolean
  display_hide_heartrate_option: boolean
  elev_high: number
  elev_low: number
  upload_id: number
  upload_id_str: string
  external_id: string
  from_accepted_tag: boolean
  pr_count: number
  total_photo_count: number
  has_kudoed: boolean
}

export type MainActivityDataPoints = Pick<
  StravaActivity,
  | 'distance'
  | 'moving_time'
  | 'average_speed'
  | 'total_elevation_gain'
  | 'average_heartrate'
  | 'weighted_average_watts'
  | 'average_cadence'
  | 'pr_count'
  | 'achievement_count'
  | 'trainer'
  | 'sport_type'
  | 'start_date_local'
>

export interface Athlete {
  id: number
  resource_state: number
}

export interface Map {
  id: string
  summary_polyline: string
  resource_state: number
}
