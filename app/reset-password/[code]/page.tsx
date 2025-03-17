"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { verifyPasswordResetCode, confirmPasswordReset } from "@/lib/firebase"

export default function ResetPasswordConfirm({
  params,
}: {
  params: { code: string }
}) {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const [email, setEmail] = useState<string | null>(null)
  const router = useRouter()
  const { code } = params

  useEffect(() => {
    verifyCode()
  }, [code])

  const verifyCode = async () => {
    try {
      const result = await verifyPasswordResetCode(code)
      if (result.success && result.email) {
        setEmail(result.email)
      } else {
        toast.error("Invalid or expired reset link")
        router.push("/reset-password")
      }
    } catch (error) {
      toast.error("Failed to verify reset code")
      router.push("/reset-password")
    } finally {
      setVerifying(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
    }

    setLoading(true)

    try {
      const result = await confirmPasswordReset(code, newPassword)
      if (result.success) {
        toast.success("Password reset successfully!")
        router.push("/login")
      } else {
        toast.error(result.error || "Failed to reset password")
      }
    } catch (error) {
      toast.error("An error occurred while resetting password")
    } finally {
      setLoading(false)
    }
  }

  if (verifying) {
    return (
      <div className="container mx-auto flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verifying Reset Link</CardTitle>
            <CardDescription>Please wait while we verify your reset link...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            {email ? `Enter a new password for ${email}` : "Enter your new password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push("/login")}
            >
              Back to Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 