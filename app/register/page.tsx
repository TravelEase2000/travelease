"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { signUp } from "@/lib/firebase"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { theme } = useTheme()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await signUp(email, password, name)

      if (result.success) {
        toast({
          title: "Registration successful",
          description: "Welcome to TravelEase! Your account has been created.",
        })

        router.push("/")
      } else {
        toast({
          title: "Registration failed",
          description: result.error || "There was a problem creating your account. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isStudentEmail = email.endsWith(".edu") || email.endsWith(".ac.in")

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8",
        theme === "dark" ? "gradient-bg" : "bg-muted/30",
      )}
    >
      <Card className={cn("w-full max-w-md", theme === "dark" ? "neon-border" : "shadow-lg")}>
        <CardHeader className="space-y-1">
          <CardTitle className={cn("text-2xl font-bold", theme === "dark" ? "neon-text" : "")}>
            Create an account
          </CardTitle>
          <CardDescription>Enter your details to create your TravelEase account</CardDescription>
        </CardHeader>

        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={cn("pl-10", theme === "dark" ? "bg-slate-900" : "")}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn("pl-10", theme === "dark" ? "bg-slate-900" : "")}
                  required
                />
              </div>
              {email && (
                <div className="text-xs mt-1">
                  {isStudentEmail ? (
                    <span className="text-green-600 dark:text-green-400">
                      ✓ Student email detected - you'll get student discounts!
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      Use a .edu or .ac.in email to qualify for student discounts.
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn("pl-10", theme === "dark" ? "bg-slate-900" : "")}
                  required
                  minLength={8}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={cn("pl-10", theme === "dark" ? "bg-slate-900" : "")}
                  required
                />
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className={cn("text-primary hover:underline", theme === "dark" ? "neon-text" : "")}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className={cn("text-primary hover:underline", theme === "dark" ? "neon-text" : "")}>
                Privacy Policy
              </Link>
              .
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className={cn("w-full", theme === "dark" ? "neon-button" : "", isLoading ? "opacity-70" : "")}
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className={cn("text-primary hover:underline", theme === "dark" ? "neon-text" : "")}>
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

