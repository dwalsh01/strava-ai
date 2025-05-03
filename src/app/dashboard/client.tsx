'use client'

import { useState, useEffect } from 'react'
import HeaderAuthButtons from '@/app/components/buttons/HeaderAuthButtons'
import { StravaActivity } from '@/app/types/stravaActivity'
import ActivitiesList from './ActivitiesList'
import AiSuggestion from './aiSuggestion'
import Profile from './Profile'

export default function ClientDashboard() {
  const [activities, setActivities] = useState<StravaActivity[]>([])
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(`/api/activities?page=${page}`)
      .then((res) => res.json())
      .then((data) => setActivities([...activities, ...data]))
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
      <nav className="flex items-center justify-between p-2 border-b-gray-300 bg-white">
        <div className="text-xl font-bold text-[#FC4C02] sm:truncate sm:text-3xl sm:tracking-tight">
          Strava AI
        </div>
        <HeaderAuthButtons />
      </nav>
      <div className=" mt-8 flex w-full gap-4 p-4">
        <div className="w-1/3 flex flex-col gap-4">
          <Profile />
          <AiSuggestion suggestion={suggestion} />
        </div>
        <ActivitiesList
          activities={activities}
          loadMoreAction={loadMoreAction}
        />
      </div>
    </>
  )
}
