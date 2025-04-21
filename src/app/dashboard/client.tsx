'use client'

import { useState, useEffect } from 'react'
import HeaderAuthButtons from '@/app/components/buttons/HeaderAuthButtons'
import { StravaActivity } from '@/app/types/stravaActivity'
import SidebarContent from './sidebarContent'
import AiSuggestion from './aiSuggestion'

export default function ClientDashboard() {
  const [activities, setActivities] = useState<StravaActivity[]>([])
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(`/api/activities?page=${page}`)
      .then((res) => res.json())
      .then((data) => setActivities(data))
  }, [page])

  useEffect(() => {
    if (activities.length > 0) {
      fetch(`/api/ai-suggestions`)
        .then((res) => res.json())
        .then((data) => setSuggestion(data.suggestion))
    }
  }, [activities])

  const loadMoreAction = () => setPage(page + 1)
  return (
    <>
      <nav className="flex items-center justify-between p-4">
        <div className="text-2xl font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
          Strava AI Coach
        </div>
        <HeaderAuthButtons />
      </nav>
      <div className="flex gap-4 p-4">
        {/* Left-hand side: Activities list */}
        <SidebarContent
          activities={activities}
          loadMoreAction={loadMoreAction}
        />
        {/* Right-hand side: Main content section */}
        <AiSuggestion suggestion={suggestion} />
      </div>
    </>
  )
}
