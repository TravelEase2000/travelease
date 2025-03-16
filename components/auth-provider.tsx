"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth, getUserData } from "@/lib/firebase"

type UserData = {
  uid: string
  email: string
  name: string
  isStudent: boolean
  bookings: string[]
} | null

type AuthContextType = {
  user: User | null
  userData: UserData
  loading: boolean
  setUserData: (data: UserData) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  setUserData: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser)

      if (authUser) {
        // Fetch user data from Firestore
        const result = await getUserData(authUser.uid)
        if (result.success) {
          setUserData(result.data as UserData)
        }
      } else {
        setUserData(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user, userData, loading, setUserData }}>{children}</AuthContext.Provider>
}

