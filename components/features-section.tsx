import { MapPin, Calendar, MessageSquare, CreditCard } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: <MapPin className="h-10 w-10 text-primary" />,
      title: "Interactive Maps",
      description:
        "View your journey on interactive maps and see the distance from your current location to the station.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Flexible Scheduling",
      description: "Choose your preferred travel dates and find the most convenient train options.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "AI Chatbot Assistance",
      description: "Get instant answers to your questions with our intelligent chatbot assistant.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Student Discounts",
      description: "Special pricing and exclusive offers for students with valid ID.",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

