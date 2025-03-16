"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, MapPin, Share2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ConfirmationPage() {
  const [bookingDetails, setBookingDetails] = useState({
    bookingId: "",
    trainName: "",
    departureStation: "",
    arrivalStation: "",
    departureTime: "",
    arrivalTime: "",
    date: "",
    passengers: 0,
    totalPrice: 0,
  })
  const router = useRouter()

  useEffect(() => {
    // Generate a random booking ID
    const generateBookingId = () => {
      return (
        "TRN" +
        Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0")
      )
    }

    // In a real app, this would come from the booking API response
    // For demo purposes, we'll create mock data
    setBookingDetails({
      bookingId: generateBookingId(),
      trainName: "Express 101",
      departureStation: "New York Central",
      arrivalStation: "Boston South",
      departureTime: "08:30",
      arrivalTime: "11:45",
      date: "March 15, 2025",
      passengers: 1,
      totalPrice: 36.13, // After student discount
    })

    // If there's no booking data in a real app, redirect to home
    // This is just for demo purposes
    const timeout = setTimeout(() => {
      if (typeof window !== "undefined" && !sessionStorage.getItem("fromBooking")) {
        router.push("/")
      }
    }, 500)

    // Set a flag to indicate we came from booking
    sessionStorage.setItem("fromBooking", "true")

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your train ticket has been booked successfully. Details have been sent to your email.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader className="bg-muted/30">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>Booking ID: {bookingDetails.bookingId}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-lg mb-4">{bookingDetails.trainName}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{bookingDetails.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Passengers</p>
                    <p className="font-medium">{bookingDetails.passengers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Price</p>
                    <p className="font-medium">${bookingDetails.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground">Departure</p>
                  <p className="font-medium text-lg">{bookingDetails.departureTime}</p>
                  <div className="flex items-start gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm">{bookingDetails.departureStation}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Arrival</p>
                  <p className="font-medium text-lg">{bookingDetails.arrivalTime}</p>
                  <div className="flex items-start gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm">{bookingDetails.arrivalStation}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-muted/30 p-6">
            <div className="w-full text-sm text-muted-foreground">
              <p>Please arrive at the station at least 30 minutes before departure.</p>
              <p>Show this confirmation or your e-ticket at the station.</p>
            </div>
          </CardFooter>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/bookings">
            <Button variant="outline">View All Bookings</Button>
          </Link>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

