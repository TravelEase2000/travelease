import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Engineering Student",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "This app has made traveling between home and university so much easier. I love the map feature that shows me exactly how to get to the station!",
    },
    {
      name: "Sophia Chen",
      role: "Medical Student",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "The student discounts are amazing, and the booking process is incredibly straightforward. Definitely recommend to all my classmates.",
    },
    {
      name: "Marcus Williams",
      role: "Business Student",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "The AI chatbot helped me figure out the best route when I was stuck. It's like having a personal travel assistant!",
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">What Students Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

