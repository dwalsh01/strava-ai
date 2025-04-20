'use client'

import { StravaActivity } from '@/app/types/stravaActivity'
import convertToPace from '@/app/utils/convertToPace'

interface SidebarContentProps {
  activities: StravaActivity[]
  loadMoreAction: () => void
}

export default function SidebarContent({
  activities,
  loadMoreAction,
}: SidebarContentProps) {
  return (
    <div className="w-1/3 flex flex-col">
      <div className="flex flex-col gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="w-full bg-gray-900 p-4 rounded-md">
            <h3 className="text-lg font-bold">{activity.name}</h3>
            <p>{activity.type}</p>
            <p>{new Date(activity.start_date).toLocaleDateString()}</p>
            <p>{Math.round((activity.distance * 100) / 1000) / 100} km</p>
            <p>
              {convertToPace({
                distanceInMeters: activity.distance,
                movingTimeInSeconds: activity.moving_time,
              })}
            </p>
            <p>{Math.round(activity.average_heartrate)} bpm</p>
          </div>
        ))}
        {activities.length > 0 && (
          <button
            className="cursor-pointer bg-[#FC4C02] hover:bg-[#e04502] text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-200"
            onClick={loadMoreAction}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  )
}
