"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Download, MapPin, Search, TrainIcon } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

interface Booking {
  id: string
  trainName: string
  departureStation: string
  arrivalStation: string
  departureTime: string
  arrivalTime: string
  date: string
  status: "upcoming" | "completed" | "cancelled"
  price: number
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push("/login")
      return
    }

    // In a real app, this would be an API call to fetch user's bookings
    // For demo purposes, we'll create mock data
    const mockBookings: Booking[] = [
      {
        id: "TRN123456",
        trainName: "Express 101",
        departureStation: "New York Central",
        arrivalStation: "Boston South",
        departureTime: "08:30",
        arrivalTime: "11:45",
        date: "March 15, 2025",
        status: "upcoming",
        price: 36.13,
      },
      {
        id: "TRN789012",
        trainName: "Rapid 205",
        departureStation: "Chicago Union",
        arrivalStation: "Detroit Central",
        departureTime: "09:20",
        arrivalTime: "12:10",
        date: "March 20, 2025",
        status: "upcoming",
        price: 33.07,
      },
      {
        id: "TRN345678",
        trainName: "Intercity 307",
        departureStation: "LA Union",
        arrivalStation: "SF Transbay",
        departureTime: "07:45",
        arrivalTime: "15:30",
        date: "February 28, 2025",
        status: "completed",
        price: 55.25,
      },
      {
        id: "TRN901234",
        trainName: "Express 505",
        departureStation: "Washington Union",
        arrivalStation: "Philadelphia 30th St",
        departureTime: "11:30",
        arrivalTime: "13:15",
        date: "February 15, 2025",
        status: "cancelled",
        price: 25.49,
      },
    ]

    setBookings(mockBookings)
    setFilteredBookings(mockBookings)
  }, [user, router])

  useEffect(() => {
    if (searchQuery) {
      const filtered = bookings.filter(
        (booking) =>
          booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.trainName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.departureStation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.arrivalStation.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredBookings(filtered)
    } else {
      setFilteredBookings(bookings)
    }
  }, [searchQuery, bookings])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const filterBookingsByStatus = (status: string | null) => {
    if (!status) return filteredBookings
    return filteredBookings.filter((booking) => booking.status === status)
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">View and manage all your train bookings</p>
        </div>

        <div className="w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              className="pl-10 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {renderBookings(filterBookingsByStatus(null))}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          {renderBookings(filterBookingsByStatus("upcoming"))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {renderBookings(filterBookingsByStatus("completed"))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-6">
          {renderBookings(filterBookingsByStatus("cancelled"))}
        </TabsContent>
      </Tabs>
    </div>
  )

  function renderBookings(bookings: Booking[]) {
    if (bookings.length === 0) {
      return (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <TrainIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No bookings found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery
              ? "No bookings match your search criteria."
              : "You don't have any bookings in this category yet."}
          </p>
          <Link href="/">
            <Button>Book a Train</Button>
          </Link>
        </div>
      )
    }

    return bookings.map((booking) => (
      <Card key={booking.id} className="overflow-hidden">
        <CardHeader className="bg-muted/30 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <CardTitle className="text-lg">{booking.trainName}</CardTitle>
              <CardDescription>Booking ID: {booking.id}</CardDescription>
            </div>
            <Badge className={getStatusColor(booking.status)}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Duration: 3h 15m</span>
              </div>
              <div className="font-medium mt-2">${booking.price.toFixed(2)}</div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Departure</p>
              <p className="font-medium">{booking.departureTime}</p>
              <div className="flex items-start gap-2 mt-1">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <p className="text-sm">{booking.departureStation}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Arrival</p>
              <p className="font-medium">{booking.arrivalTime}</p>
              <div className="flex items-start gap-2 mt-1">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <p className="text-sm">{booking.arrivalStation}</p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/30 p-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Ticket
          </Button>

          {booking.status === "upcoming" && (
            <>
              <Link href={`/booking/${booking.id}`}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                Cancel Booking
              </Button>
            </>
          )}

          {booking.status === "completed" && (
            <Button variant="outline" size="sm">
              Book Again
            </Button>
          )}
        </CardFooter>
      </Card>
    ))
  }
}

