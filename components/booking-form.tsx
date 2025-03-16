"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import TrainResults from "./train-results"
import { type Station, getStations } from "@/lib/train-data"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

export default function BookingForm() {
  const [fromQuery, setFromQuery] = useState("")
  const [toQuery, setToQuery] = useState("")
  const [fromStation, setFromStation] = useState<Station | null>(null)
  const [toStation, setToStation] = useState<Station | null>(null)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showResults, setShowResults] = useState(false)
  const [fromStations, setFromStations] = useState<Station[]>([])
  const [toStations, setToStations] = useState<Station[]>([])
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)

  // Update station suggestions when query changes
  useEffect(() => {
    setFromStations(getStations(fromQuery))
  }, [fromQuery])

  useEffect(() => {
    setToStations(getStations(toQuery))
  }, [toQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (fromStation && toStation && date) {
      setShowResults(true)
    }
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) return ""
    return format(date, "yyyy-MM-dd")
  }

  return (
    <Card className="p-6 shadow-lg">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Popover open={fromOpen} onOpenChange={setFromOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="from"
                    placeholder="Departure station"
                    className="pl-10"
                    value={fromStation ? fromStation.name : fromQuery}
                    onChange={(e) => {
                      setFromStation(null)
                      setFromQuery(e.target.value)
                    }}
                    onClick={() => setFromOpen(true)}
                    required
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start" side="bottom">
                <Command>
                  <CommandInput placeholder="Search stations..." value={fromQuery} onValueChange={setFromQuery} />
                  <CommandList>
                    <CommandEmpty>No stations found.</CommandEmpty>
                    <CommandGroup>
                      {fromStations.map((station) => (
                        <CommandItem
                          key={station.id}
                          value={station.name}
                          onSelect={() => {
                            setFromStation(station)
                            setFromQuery("")
                            setFromOpen(false)
                          }}
                        >
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{station.name}</span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            {station.city}, {station.state}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Popover open={toOpen} onOpenChange={setToOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="to"
                    placeholder="Arrival station"
                    className="pl-10"
                    value={toStation ? toStation.name : toQuery}
                    onChange={(e) => {
                      setToStation(null)
                      setToQuery(e.target.value)
                    }}
                    onClick={() => setToOpen(true)}
                    required
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start" side="bottom">
                <Command>
                  <CommandInput placeholder="Search stations..." value={toQuery} onValueChange={setToQuery} />
                  <CommandList>
                    <CommandEmpty>No stations found.</CommandEmpty>
                    <CommandGroup>
                      {toStations.map((station) => (
                        <CommandItem
                          key={station.id}
                          value={station.name}
                          onSelect={() => {
                            setToStation(station)
                            setToQuery("")
                            setToOpen(false)
                          }}
                        >
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{station.name}</span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            {station.city}, {station.state}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-end">
            <Button type="submit" className="w-full" disabled={!fromStation || !toStation || !date}>
              Search Trains
            </Button>
          </div>
        </div>
      </form>

      {showResults && fromStation && toStation && date && (
        <div className="mt-8">
          <TrainResults fromStationId={fromStation.id} toStationId={toStation.id} date={formatDate(date)} />
        </div>
      )}
    </Card>
  )
}

