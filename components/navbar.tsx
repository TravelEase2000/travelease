"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Menu, Train, X, MapPin, MessageSquare, Info, Moon, Sun, LogOut, User, Ticket } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useAuth } from "./auth-provider"
import { logOut } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const { user, userData } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const routes = [
    { href: "/", label: "Home", icon: <Train className="h-4 w-4 mr-2" /> },
    { href: "/map", label: "Map", icon: <MapPin className="h-4 w-4 mr-2" /> },
    { href: "/chat", label: "Chat", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
    { href: "/about", label: "About", icon: <Info className="h-4 w-4 mr-2" /> },
  ]

  const handleLogout = async () => {
    const result = await logOut()
    if (result.success) {
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      })
      router.push("/")
    } else {
      toast({
        title: "Logout failed",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Train className={cn("h-6 w-6 text-primary", theme === "dark" ? "neon-text" : "")} />
            <span className={cn("font-bold text-xl hidden sm:inline-block", theme === "dark" ? "neon-text" : "")}>
              TravelEase
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center",
                pathname === route.href ? "text-primary" : "text-muted-foreground",
                theme === "dark" && pathname === route.href ? "neon-text" : "",
              )}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className={theme === "dark" ? "neon-button" : ""}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className={cn("h-8 w-8", theme === "dark" ? "neon-border" : "")}>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {userData?.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={theme === "dark" ? "neon-border" : ""}>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{userData?.name || user.displayName || "User"}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    {userData?.isStudent && (
                      <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full inline-flex items-center mt-1">
                        Student
                      </span>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bookings" className="cursor-pointer">
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>My Bookings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn("hidden sm:flex", theme === "dark" ? "neon-button" : "")}
                >
                  Log in
                </Button>
              </Link>

              <Link href="/register">
                <Button size="sm" className={cn("hidden sm:flex", theme === "dark" ? "neon-button" : "")}>
                  Sign up
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Navigation Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={cn("w-[300px] sm:w-[400px]", theme === "dark" ? "gradient-bg" : "")}>
              <div className="flex flex-col gap-6 px-2 py-6">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <Train className={cn("h-6 w-6 text-primary", theme === "dark" ? "neon-text" : "")} />
                    <span className={cn("font-bold text-xl", theme === "dark" ? "neon-text" : "")}>TravelEase</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <nav className="flex flex-col gap-4">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
                        pathname === route.href ? "bg-muted text-primary" : "text-muted-foreground",
                        theme === "dark" && pathname === route.href ? "neon-text" : "",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {route.icon}
                      {route.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col gap-2 mt-auto">
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 px-3 py-2">
                        <Avatar className={cn("h-8 w-8", theme === "dark" ? "neon-border" : "")}>
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {userData?.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{userData?.name || user.displayName || "User"}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                          {userData?.isStudent && (
                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full inline-flex items-center mt-1">
                              Student
                            </span>
                          )}
                        </div>
                      </div>
                      <Link href="/profile" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start", theme === "dark" ? "neon-button" : "")}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                      </Link>
                      <Link href="/bookings" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start", theme === "dark" ? "neon-button" : "")}
                        >
                          <Ticket className="mr-2 h-4 w-4" />
                          My Bookings
                        </Button>
                      </Link>
                      <Button
                        variant="default"
                        className={cn("w-full justify-start", theme === "dark" ? "neon-button" : "")}
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className={cn("w-full", theme === "dark" ? "neon-button" : "")}>
                          Log in
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        <Button className={cn("w-full", theme === "dark" ? "neon-button" : "")}>Sign up</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

