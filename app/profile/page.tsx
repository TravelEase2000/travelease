"use client"

import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/lib/auth-context"
import { getUserData } from "@/lib/firebase"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface UserData {
  name: string
  email: string
  isStudent: boolean
  createdAt: string
  bookings: string[]
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        const { success, data } = await getUserData(user.uid)
        if (success && data) {
          setUserData(data as UserData)
        }
        setLoading(false)
      }
    }
    fetchUserData()
  }, [user])

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[300px]" />
                </div>
              ) : userData ? (
                <div className="space-y-4">
                  <p>
                    <span className="font-semibold">Name:</span> {userData.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {userData.email}
                  </p>
                  <p>
                    <span className="font-semibold">Account Type:</span>{" "}
                    {userData.isStudent ? "Student" : "Regular"}
                  </p>
                  <p>
                    <span className="font-semibold">Member Since:</span>{" "}
                    {new Date(userData.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Total Bookings:</span>{" "}
                    {userData.bookings.length}
                  </p>
                </div>
              ) : (
                <p>Failed to load user data</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
} 