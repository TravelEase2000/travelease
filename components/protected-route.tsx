"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireVerified?: boolean
  studentOnly?: boolean
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  requireVerified = true,
  studentOnly = false,
}: ProtectedRouteProps) {
  const { user, loading, isStudent } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // Redirect to login if authentication is required but user is not logged in
        router.push(`/login?redirect=${pathname}`)
      } else if (requireVerified && user && !user.emailVerified) {
        // Redirect to verification page if email verification is required
        router.push("/verify-email")
      } else if (studentOnly && !isStudent) {
        // Redirect to home if student access is required but user is not a student
        router.push("/")
      }
    }
  }, [loading, user, isStudent, requireAuth, requireVerified, studentOnly, router, pathname])

  // Show nothing while loading or redirecting
  if (loading || (requireAuth && !user) || (requireVerified && user && !user.emailVerified) || (studentOnly && !isStudent)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
} 