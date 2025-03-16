"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

// Define the props interface outside the component
interface MapComponentProps {
  userLocation: { lat: number; lng: number } | null
  selectedTrain: {
    id: string
    name: string
    route: string
    departureStation: { name: string; lat: number; lng: number }
    arrivalStation: { name: string; lat: number; lng: number }
  } | null
}

// Create a simpler placeholder component for when the map is loading
function MapPlaceholder() {
  return (
    <div className="h-[600px] w-full flex items-center justify-center bg-muted">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-3 w-3 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-3 w-3 rounded-full bg-primary animate-bounce"></div>
          </div>
        </div>
        <p>Loading map...</p>
      </div>
    </div>
  )
}

// Create the actual map component implementation
function MapComponentImpl({ userLocation, selectedTrain }: MapComponentProps) {
  const mapRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [L, setL] = useState<any>(null)

  // Load Leaflet dynamically on the client side
  useEffect(() => {
    // Import Leaflet only on the client side
    import("leaflet").then((leaflet) => {
      setL(leaflet.default)
    })
  }, [])

  // Initialize and update the map when Leaflet is loaded
  useEffect(() => {
    if (!L || !mapContainerRef.current) return

    // Initialize map if it doesn't exist
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([39.8283, -98.5795], 4)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)
    }

    // Clear existing markers
    mapRef.current.eachLayer((layer: any) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        mapRef.current?.removeLayer(layer)
      }
    })

    // Add user location marker
    if (userLocation) {
      const userIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full border-2 border-white">
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>`,
        className: "user-location-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(mapRef.current)

      // Only show "Your Location" if it's not the default New York location
      if (userLocation.lat !== 40.7128 || userLocation.lng !== -74.006) {
        userMarker.bindPopup("Your Location").openPopup()
      } else {
        userMarker.bindPopup("Default Location (New York)").openPopup()
      }
    }

    // Add train route markers and line
    if (selectedTrain) {
      const { departureStation, arrivalStation } = selectedTrain

      // Create custom icons
      const stationIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-8 h-8 bg-primary rounded-full border-2 border-white">
                <div class="text-white text-xs">🚉</div>
              </div>`,
        className: "station-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      // Add departure station marker
      L.marker([departureStation.lat, departureStation.lng], { icon: stationIcon })
        .addTo(mapRef.current)
        .bindPopup(`<b>${departureStation.name}</b><br>Departure Station`)

      // Add arrival station marker
      L.marker([arrivalStation.lat, arrivalStation.lng], { icon: stationIcon })
        .addTo(mapRef.current)
        .bindPopup(`<b>${arrivalStation.name}</b><br>Arrival Station`)

      // Add route line
      const routeLine = L.polyline(
        [
          [departureStation.lat, departureStation.lng],
          [arrivalStation.lat, arrivalStation.lng],
        ],
        { color: "hsl(var(--primary))", weight: 3, dashArray: "5, 10" },
      ).addTo(mapRef.current)

      // Add train icon moving along the route
      const trainIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-primary shadow-md">
                <div class="text-primary">🚄</div>
              </div>`,
        className: "train-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      // Calculate a point along the route for the train
      const midLat = (departureStation.lat + arrivalStation.lat) / 2
      const midLng = (departureStation.lng + arrivalStation.lng) / 2

      L.marker([midLat, midLng], { icon: trainIcon })
        .addTo(mapRef.current)
        .bindPopup(`<b>${selectedTrain.name}</b><br>${selectedTrain.route}`)

      // Fit map to show all markers
      const bounds = L.latLngBounds(
        [departureStation.lat, departureStation.lng],
        [arrivalStation.lat, arrivalStation.lng],
      )

      if (userLocation) {
        bounds.extend([userLocation.lat, userLocation.lng])
      }

      mapRef.current.fitBounds(bounds, { padding: [50, 50] })
    } else if (userLocation) {
      // If no train selected but user location available, center on user
      mapRef.current.setView([userLocation.lat, userLocation.lng], 10)
    }

    // Cleanup function
    return () => {
      // No need to destroy the map on every render
    }
  }, [L, userLocation, selectedTrain])

  return <div ref={mapContainerRef} className="h-[600px] w-full" />
}

// Export a dynamic component that only loads on the client side
const MapComponent = dynamic(() => Promise.resolve(MapComponentImpl), {
  ssr: false,
  loading: () => <MapPlaceholder />,
})

export default MapComponent

