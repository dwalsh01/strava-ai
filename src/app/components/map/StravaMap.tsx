'use client'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import polyline from '@mapbox/polyline'
import 'leaflet/dist/leaflet.css'

import { Map } from '@/app/types/stravaActivity'
interface StravaMapProps {
  mapData: Map
}

export default function StravaMap({ mapData }: StravaMapProps) {
  const decoded = polyline.decode(mapData.summary_polyline) // returns [lat, lng] pairs
  const latLngs = decoded.map(([lat, lng]) => [lat, lng] as [number, number])
  const rawCenter = latLngs[Math.floor(latLngs.length / 2)] || [0, 0]
  const offsetCenter: [number, number] = [rawCenter[0], rawCenter[1] + 0.01]

  return (
    <MapContainer
      center={offsetCenter}
      zoom={13}
      dragging={false}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      attributionControl={false}
      zoomControl={false}
      style={{ height: '200px', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={latLngs} color="red" />
    </MapContainer>
  )
}
