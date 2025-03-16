"use client"

import { useState, useEffect } from "react"
import { TrainIcon, ArrowRight, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { type TrainResult, searchTrains } from "@/lib/train-data"
import { useRouter } from "next/navigation"

interface TrainResultsProps {
  fromStationId: string
  toStationId: string
  date: string
}

export default function TrainResults({ fromStationId, toStationId, date }: TrainResultsProps) {
  const [trains, setTrains] = useState<TrainResult[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // In a real app, this would be an API call
    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const results = searchTrains(fromStationId, toStationId, date)
      setTrains(results)
      setLoading(false)
    }, 1000)
  }, [fromStationId, toStationId, date])

  const handleSelectTrain = (trainId: string) => {
    router.push(`/booking/${trainId}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center">
          <div className="flex space-x-2 mb-4">
            <div className="h-3 w-3 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-3 w-3 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-3 w-3 rounded-full bg-primary animate-bounce"></div>
          </div>
          <p className="text-muted-foreground">Searching for trains...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          {trains.length > 0 ? (
            <>
              {trains[0].departureStation.name} to {trains[0].arrivalStation.name}
            </>
          ) : (
            <>Search Results</>
          )}
        </h3>
        <div className="flex items-center text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          {format(new Date(date), "EEEE, MMMM d, yyyy")}
        </div>
      </div>

      {trains.length === 0 ? (
        <div className="text-center py-8 bg-muted/30 rounded-lg p-6">
          <TrainIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No trains found</h3>
          <p className="text-muted-foreground mb-6">
            We couldn't find any trains for this route and date. Try different stations or dates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">Change Date</Button>
            <Button variant="outline">Change Stations</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {trains.map((train) => (
            <Card key={train.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <TrainIcon className="h-5 w-5 mr-2 text-primary" />
                      <h4 className="font-medium">{train.train.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {train.seatsAvailable} seats left
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {train.train.type}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-2xl font-semibold">{train.departureTime}</span>
                    <span className="text-muted-foreground text-sm">{train.departureStation.name}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {train.departureStation.city}, {train.departureStation.state}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-muted-foreground text-sm mb-1">{train.duration}</div>
                    <div className="relative w-full flex items-center justify-center">
                      <div className="border-t border-dashed border-muted w-full absolute"></div>
                      <ArrowRight className="h-5 w-5 bg-card z-10 text-muted-foreground px-1" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{train.distance} km</div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-2xl font-semibold">{train.arrivalTime}</span>
                    <span className="text-muted-foreground text-sm">{train.arrivalStation.name}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {train.arrivalStation.city}, {train.arrivalStation.state}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-muted/30 p-6 flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold">${train.price.toFixed(2)}</span>
                  <span className="text-muted-foreground ml-2">per person</span>
                </div>
                <Button onClick={() => handleSelectTrain(train.id)}>Select</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

