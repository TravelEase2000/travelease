import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl max-w-2xl">
            We're on a mission to make train travel simple, affordable, and accessible for students across the country.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2023 by a group of university students who were frustrated with the complexity of booking
                train tickets, our platform was born out of necessity.
              </p>
              <p className="text-muted-foreground mb-4">
                We realized that students face unique challenges when traveling - tight budgets, complex schedules, and
                unfamiliar destinations. Our solution combines technology with simplicity to address these pain points.
              </p>
              <p className="text-muted-foreground">
                Today, we're proud to serve thousands of students across multiple universities, helping them travel
                smarter and more affordably.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="/placeholder.svg?height=400&width=600" alt="Team photo" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-primary" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">For general inquiries and support:</p>
                <a href="mailto:support@trainbooking.com" className="text-primary hover:underline">
                  support@trainbooking.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-primary" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Our support team is available Mon-Fri, 9am-5pm:</p>
                <a href="tel:+1234567890" className="text-primary hover:underline">
                  +1 (234) 567-890
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Visit Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Our headquarters:</p>
                <address className="not-italic">
                  123 Innovation Street
                  <br />
                  Tech District
                  <br />
                  San Francisco, CA 94103
                </address>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Send Us Feedback</h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="What's this about?" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Your Message
                </label>
                <Textarea id="message" placeholder="Tell us what you think..." rows={6} required />
              </div>

              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Feedback
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

