"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Bot, User } from "lucide-react"

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: "Hello! I'm your train booking assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In a real app, this would use the OpenAI API
      // For demo purposes, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a response based on the user's input
      let response = ""
      const userInput = input.toLowerCase()

      if (userInput.includes("book") || userInput.includes("ticket")) {
        response =
          "You can book train tickets on our platform by going to the home page and using the search form. Just enter your departure and arrival stations, select a date, and click 'Search Trains'. You'll then see available options and can complete your booking."
      } else if (userInput.includes("discount") || userInput.includes("student")) {
        response =
          "Yes! We offer a 15% student discount on all train tickets. The discount is applied automatically when you're logged in with a verified student account. Make sure to verify your student status in your profile settings."
      } else if (userInput.includes("cancel") || userInput.includes("refund")) {
        response =
          "You can cancel your booking up to 24 hours before the departure time for a full refund. To cancel, go to 'My Bookings' in your account, find the booking you want to cancel, and click the 'Cancel Booking' button."
      } else if (userInput.includes("map") || userInput.includes("location")) {
        response =
          "Our map feature shows you the train route and calculates the distance from your current location to the railway station. You can access it by clicking on the 'Map' tab in the navigation menu. It's a great way to plan your journey to the station!"
      } else if (userInput.includes("payment") || userInput.includes("pay")) {
        response =
          "We accept various payment methods including credit/debit cards, PayPal, and Apple Pay. All payments are processed securely, and your payment information is never stored on our servers."
      } else if (userInput.includes("hello") || userInput.includes("hi") || userInput.includes("hey")) {
        response = "Hello there! How can I assist you with your train booking today?"
      } else {
        response =
          "I'm here to help with any questions about booking train tickets, using our map feature, student discounts, or any other aspects of our service. Could you please provide more details about what you'd like to know?"
      }

      // Add AI response
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-3xl font-bold mb-4">AI Chat Assistant</h1>
          <p className="text-lg max-w-2xl">
            Have questions about booking trains or using our platform? Our AI assistant is here to help!
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-4xl">
          <Card className="border shadow-lg">
            <CardHeader className="bg-muted/30">
              <CardTitle className="flex items-center">
                <Bot className="mr-2 h-5 w-5 text-primary" />
                Train Booking Assistant
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex items-start gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <Avatar className={message.role === "user" ? "bg-primary" : "bg-muted"}>
                        {message.role === "user" ? (
                          <>
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          </>
                        ) : (
                          <>
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          </>
                        )}
                      </Avatar>

                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-3 max-w-[80%]">
                      <Avatar className="bg-muted">
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-4 py-2 bg-muted">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <CardFooter className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardFooter>
          </Card>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {[
                "How do I book a train ticket?",
                "Are there student discounts available?",
                "How does the map feature work?",
                "Can I cancel my booking?",
                "How early should I arrive at the station?",
              ].map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => {
                    setInput(question)
                  }}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

