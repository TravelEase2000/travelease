"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { type TrainResult, getTrainById } from "@/lib/train-data"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Clock, CreditCard, MapPin, TrainIcon, User } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"

export default function BookingPage({ params }: { params: { id: string } }) {
  const [train, setTrain] = useState<TrainResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [passengers, setPassengers] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isBooking, setIsBooking] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    // In a real app, this would be an API call
    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const result = getTrainById(params.id)
      if (!result) {
        router.push("/")
        return
      }
      setTrain(result)
      setLoading(false)
    }, 1000)
  }, [params.id, router])

  const handleBooking = async () => {
    if (!train) return

    setIsBooking(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Booking Confirmed!",
      description: `Your booking for ${train.train.name} from ${train.departureStation.name} to ${train.arrivalStation.name} has been confirmed.`,
    })

    router.push("/booking/confirmation")
  }

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center">
            <div className="flex space-x-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-3 w-3 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-3 w-3 rounded-full bg-primary animate-bounce"></div>
            </div>
            <p className="text-muted-foreground">Loading train details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!train) {
    return (
      <div className="container py-12">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Train Not Found</h2>
          <p className="text-muted-foreground mb-6">We couldn't find the train you're looking for.</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalPrice = train.price * passengers
  const studentDiscount = 0.15 // 15% student discount
  const discountedPrice = totalPrice * (1 - studentDiscount)

  return (
    <div className="container py-12">
      <Link href="/" className="flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to search
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Complete Your Booking</CardTitle>
              <CardDescription>Review your trip details and complete your booking</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Trip Summary */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Trip Summary</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <TrainIcon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">{train.train.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {train.train.type} • Train #{train.train.number}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">{format(new Date(train.date), "EEEE, MMMM d, yyyy")}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Duration: {train.duration}</p>
                        <p className="text-sm text-muted-foreground">Distance: {train.distance} km</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Departure</p>
                      <p className="font-medium text-lg">{train.departureTime}</p>
                      <div className="flex items-start gap-2 mt-1">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm">{train.departureStation.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {train.departureStation.city}, {train.departureStation.state}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Arrival</p>
                      <p className="font-medium text-lg">{train.arrivalTime}</p>
                      <div className="flex items-start gap-2 mt-1">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm">{train.arrivalStation.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {train.arrivalStation.city}, {train.arrivalStation.state}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passenger Information */}
              <div>
                <h3 className="text-lg font-medium mb-4">Passenger Information</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="passengers">Number of Passengers</Label>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                        disabled={passengers <= 1}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center">{passengers}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setPassengers(Math.min(train.seatsAvailable, passengers + 1))}
                        disabled={passengers >= train.seatsAvailable}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {user ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="name" value={user.name} className="pl-10" readOnly />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={user.email} readOnly />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Please{" "}
                        <Link href="/login" className="text-primary hover:underline">
                          log in
                        </Link>{" "}
                        or{" "}
                        <Link href="/register" className="text-primary hover:underline">
                          sign up
                        </Link>{" "}
                        to continue with your booking.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-medium mb-4">Payment Method</h3>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="apple-pay" id="apple-pay" />
                    <Label htmlFor="apple-pay">Apple Pay</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Price Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>
                  Base Fare ({passengers} {passengers === 1 ? "passenger" : "passengers"})
                </span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Student Discount (15%)</span>
                <span>-${(totalPrice * studentDiscount).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${discountedPrice.toFixed(2)}</span>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>* Student discount applied automatically</p>
                <p>* Free cancellation up to 24 hours before departure</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleBooking} disabled={isBooking}>
                {isBooking ? "Processing..." : "Confirm Booking"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

