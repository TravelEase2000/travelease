"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { toast } from "sonner"
import { signIn, resendVerificationEmail } from "@/lib/firebase"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [needsVerification, setNeedsVerification] = useState(false)
  const router = useRouter()
  const { theme } = useTheme()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn(email, password)

      if (result.success) {
        toast.success("Welcome back to TravelEase!")
        router.push("/")
      } else {
        if (result.needsVerification) {
          setNeedsVerification(true)
          toast.error("Please verify your email before signing in")
        } else {
          toast.error(result.error || "Please check your credentials and try again.")
        }
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendVerification = async () => {
    setIsLoading(true)
    try {
      const result = await resendVerificationEmail()
      if (result.success) {
        toast.success("Verification email sent! Please check your inbox.")
      } else {
        toast.error(result.error || "Failed to send verification email")
      }
    } catch (error) {
      toast.error("An error occurred while sending verification email")
    } finally {
      setIsLoading(false)
    }
  }

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
            Login to your account
          </CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
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
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/reset-password"
                  className={cn("text-sm text-primary hover:underline", theme === "dark" ? "neon-text" : "")}
                >
                  Forgot password?
                </Link>
              </div>
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

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>

            {needsVerification && (
              <div className="text-center space-y-2">
                <p className="text-sm text-yellow-600 dark:text-yellow-500">
                  Please verify your email before signing in.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResendVerification}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? "Sending..." : "Resend Verification Email"}
                </Button>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className={cn("w-full", theme === "dark" ? "neon-button" : "", isLoading ? "opacity-70" : "")}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="/register"
                className={cn("text-primary hover:underline", theme === "dark" ? "neon-text" : "")}
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

