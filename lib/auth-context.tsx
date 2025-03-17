"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { User } from "firebase/auth"
import { onAuthStateChange } from "./firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  isStudent: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isStudent: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isStudent, setIsStudent] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user)
      setIsStudent(user?.email?.endsWith(".edu") || user?.email?.endsWith(".ac.in") || false)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, isStudent }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 