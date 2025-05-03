'use client'
import { StravaActivity } from '@/app/types/stravaActivity'
import formatAveragePace from '@/app/utils/formatAveragePace'

import dynamic from 'next/dynamic'

const Divider = () => <div className="h-8 border-r border-gray-400"></div>

const StravaMap = dynamic(() => import('@/app/components/map/StravaMap'), {
  ssr: false,
})

interface SidebarContentProps {
  activities: StravaActivity[]
  loadMoreAction: () => void
}

export default function ActivitiesList({
  activities,
  loadMoreAction,
}: SidebarContentProps) {
  return (
    <div className="w-2/3 flex flex-col gap-4 pb-8">
      {activities.map((activity) => (
        <div key={activity.id} className="p-4 bg-white rounded-md shadow-md">
          <p>{new Date(activity.start_date).toLocaleDateString()}</p>
          <h3 className="text-lg font-bold py-1">{activity.name}</h3>
          <div className="flex flex-row gap-2 py-1 items-center">
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm">Distance</span>
              <div>{Math.round((activity.distance * 100) / 1000) / 100} km</div>
            </div>
            <Divider />
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm">Pace</span>
              <div>
                {formatAveragePace({
                  distanceInMeters: activity.distance,
                  movingTimeInSeconds: activity.moving_time,
                })}
              </div>
            </div>
            <Divider />
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm">Heartrate</span>
              <div>{Math.round(activity.average_heartrate)} bpm</div>
            </div>
          </div>
          <StravaMap mapData={activity.map} />
        </div>
      ))}
      {activities.length > 0 && (
        <div className="flex justify-center items-center">
          <button
            className="cursor-pointer bg-[#FC4C02] hover:bg-[#e04502] text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-200"
            onClick={loadMoreAction}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  )
}
