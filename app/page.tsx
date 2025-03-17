import Link from "next/link"
import { Search } from "lucide-react"
import BookingForm from "@/components/booking-form"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import { cn } from "@/lib/utils"
import { metadata } from './metadata'
import Image from "next/image"
import { Button } from "@/components/ui/button"

export { metadata }

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Travel with Ease and Comfort
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Book train tickets, plan your journey, and explore India with our seamless booking platform.
            </p>
            <Link href="/search">
              <Button size="lg" variant="secondary">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Train Image Section */}
      <section className="relative h-[500px] w-full">
        <Image
          src="/train-background.jpg"
          alt="Indian Railway Train"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white p-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience the Joy of Train Travel
            </h2>
            <p className="text-lg md:text-xl mb-6">
              Discover the beauty of India through its extensive rail network. Safe, comfortable, and memorable journeys await you.
            </p>
            <Link href="/about">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 dark-heading">Find Your Train</h2>
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-16 bg-primary/5 dark:gradient-bg">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 dark-heading">Ready to Simplify Your Travel?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already enjoying hassle-free train bookings across India.
          </p>
          <Link
            href="/register"
            className={cn(
              "bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition-all",
              "dark:bg-white/10 dark:text-white dark:border dark:border-white/20 dark:hover:bg-white/20",
            )}
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}

