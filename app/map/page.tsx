"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation, Train } from "lucide-react"

// Import the MapComponent directly - it's already set up for client-side only rendering
import MapComponent from "@/components/map-component"

export default function MapPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // Mock train data - in a real app, this would come from an API
  const trains = [
    {
      id: "train-1",
      name: "Express 101",
      route: "New York to Boston",
      departureStation: { name: "New York Central", lat: 40.7128, lng: -74.006 },
      arrivalStation: { name: "Boston South", lat: 42.3601, lng: -71.0589 },
    },
    {
      id: "train-2",
      name: "Rapid 205",
      route: "Chicago to Detroit",
      departureStation: { name: "Chicago Union", lat: 41.8781, lng: -87.6298 },
      arrivalStation: { name: "Detroit Central", lat: 42.3314, lng: -83.0458 },
    },
    {
      id: "train-3",
      name: "Intercity 307",
      route: "Los Angeles to San Francisco",
      departureStation: { name: "LA Union", lat: 34.0522, lng: -118.2437 },
      arrivalStation: { name: "SF Transbay", lat: 37.7749, lng: -122.4194 },
    },
  ]

  // Get user's location
  useEffect(() => {
    // Set default location immediately to prevent layout shifts
    setUserLocation({ lat: 40.7128, lng: -74.006 }) // New York as default

    // Try to get user location, but provide fallback if not available
    if (typeof window !== "undefined" && navigator.geolocation) {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          },
          (error) => {
            console.log("Geolocation error:", error.message)
            // We already set the default location above
          },
          { timeout: 5000, enableHighAccuracy: false },
        )
      } catch (error) {
        console.log("Geolocation exception:", error)
        // We already set the default location above
      }
    }

    // Mark the map as loaded after a short delay
    const timer = setTimeout(() => {
      setIsMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const selectedTrainData = selectedTrain ? trains.find((train) => train.id === selectedTrain) : null

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-3xl font-bold mb-4">Interactive Train Map</h1>
          <p className="text-lg max-w-2xl">
            View train routes, station locations, and calculate distances from your current location.
          </p>
        </div>
      </section>

      <section className="py-4">
        <div className="container">
          <div className="bg-muted/30 rounded-lg p-4 mb-8">
            <h3 className="text-lg font-medium mb-2">Interactive Train Map</h3>
            <p className="text-muted-foreground">
              View train routes, station locations, and calculate distances. Select a train from the list to see its
              route.
              {userLocation && userLocation.lat === 40.7128 && userLocation.lng === -74.006 && isMapLoaded && (
                <span className="block mt-2 text-amber-600 dark:text-amber-400">
                  Note: Using default location (New York) because location access was denied or unavailable.
                </span>
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Train Selection */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Train className="mr-2 h-5 w-5 text-primary" />
                    Select a Train
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trains.map((train) => (
                      <Button
                        key={train.id}
                        variant={selectedTrain === train.id ? "default" : "outline"}
                        className="w-full justify-start text-left"
                        onClick={() => setSelectedTrain(train.id)}
                      >
                        <div>
                          <div className="font-medium">{train.name}</div>
                          <div className="text-xs text-muted-foreground">{train.route}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedTrainData && userLocation && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Navigation className="mr-2 h-5 w-5 text-primary" />
                      Distance Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {userLocation.lat === 40.7128 && userLocation.lng === -74.006
                            ? "From default location (New York) to departure station:"
                            : "From your location to departure station:"}
                        </p>
                        <p className="font-medium">
                          {calculateDistance(
                            userLocation.lat,
                            userLocation.lng,
                            selectedTrainData.departureStation.lat,
                            selectedTrainData.departureStation.lng,
                          ).toFixed(1)}{" "}
                          km
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total journey distance:</p>
                        <p className="font-medium">
                          {calculateDistance(
                            selectedTrainData.departureStation.lat,
                            selectedTrainData.departureStation.lng,
                            selectedTrainData.arrivalStation.lat,
                            selectedTrainData.arrivalStation.lng,
                          ).toFixed(1)}{" "}
                          km
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Map */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-0 overflow-hidden rounded-lg">
                  <MapComponent userLocation={userLocation} selectedTrain={selectedTrainData} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Helper function to calculate distance between two points using the Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return d
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}

