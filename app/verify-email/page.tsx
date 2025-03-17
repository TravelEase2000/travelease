"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { verifyEmail, resendVerificationEmail } from "@/lib/firebase"

export default function VerifyEmail() {
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [resending, setResending] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const oobCode = searchParams.get("oobCode")

  useEffect(() => {
    if (oobCode) {
      handleVerification(oobCode)
    }
  }, [oobCode])

  const handleVerification = async (code: string) => {
    setVerifying(true)
    try {
      const result = await verifyEmail(code)
      if (result.success) {
        setVerified(true)
        toast.success("Email verified successfully!")
      } else {
        toast.error(result.error || "Failed to verify email")
      }
    } catch (error) {
      toast.error("An error occurred during verification")
    } finally {
      setVerifying(false)
    }
  }

  const handleResendVerification = async () => {
    setResending(true)
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
      setResending(false)
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>
            {verified
              ? "Your email has been verified successfully!"
              : oobCode
              ? "Verifying your email..."
              : "Please verify your email to continue"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {verified ? (
            <Button
              className="w-full"
              onClick={() => router.push("/login")}
            >
              Continue to Login
            </Button>
          ) : oobCode ? (
            <div className="text-center">
              {verifying ? (
                <p>Verifying...</p>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => handleVerification(oobCode)}
                >
                  Retry Verification
                </Button>
              )}
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500">
                Didn't receive the verification email?
              </p>
              <Button
                className="w-full"
                onClick={handleResendVerification}
                disabled={resending}
              >
                {resending ? "Sending..." : "Resend Verification Email"}
              </Button>
            </>
          )}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/login")}
          >
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 