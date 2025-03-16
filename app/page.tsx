import Link from "next/link"
import { Search } from "lucide-react"
import BookingForm from "@/components/booking-form"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import { cn } from "@/lib/utils"
import { metadata } from './metadata'

export { metadata }

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540103711724-ebf833bde8d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')",
          }}
        />
        <div className="container relative z-20 h-full flex flex-col justify-center items-start text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 dark:text-white/90">
            Book Train Tickets <br />
            with Ease
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl text-white/90">
            The simplest way for students to book train tickets, track journeys, and explore destinations across India.
          </p>
          <div className="flex gap-4">
            <Link
              href="#booking"
              className={cn(
                "bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-lg font-medium flex items-center gap-2",
                "dark:bg-white/10 dark:text-white dark:border dark:border-white/20 dark:hover:bg-white/20",
              )}
            >
              <Search size={18} />
              Search Trains
            </Link>
            <Link
              href="/about"
              className="bg-transparent border border-white/20 hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Learn More
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

