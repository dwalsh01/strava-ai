'use client'

import HeaderAuthButtons from '@/app/components/buttons/HeaderAuthButtons'
import SidebarContent from './sidebarContent'
import { useState, useEffect } from 'react'
import { StravaActivity } from '@/app/types/stravaActivity'

export default function ClientDashboard() {
  const [activities, setActivities] = useState<StravaActivity[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(`/api/activities?page=${page}`)
      .then((res) => res.json())
      .then((data) => setActivities(data))
  }, [page])

  const loadMoreAction = () => setPage(page + 1)
  return (
    <>
      <nav className="flex items-center justify-between p-4">
        <div className="text-2xl font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
          Strava AI Coach
        </div>
        <HeaderAuthButtons />
      </nav>
      <div className="flex gap-4 p-8">
        {/* Left-hand side: Activities list */}
        <SidebarContent
          activities={activities}
          loadMoreAction={loadMoreAction}
        />
        {/* Right-hand side: Main content section */}
        <div className="w-2/3 bg-gray-900 p-8 rounded-md">
          <h3 className="text-xl font-bold text-white">Main Content</h3>
          <p className="text-gray-400">
            This section is reserved for additional content coming later.
          </p>
        </div>
      </div>
    </>
  )
}
