import Link from "next/link"
import { Train, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Train className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">TrainEase</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Making train travel simple and affordable for students across the country.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-muted-foreground hover:text-primary text-sm">
                  Map
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-muted-foreground hover:text-primary text-sm">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Download Our App</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get the TrainEase mobile app for even easier booking on the go.
            </p>
            <div className="space-y-2">
              <Link href="#" className="block">
                <img src="/placeholder.svg?height=40&width=120" alt="Download on App Store" className="h-10" />
              </Link>
              <Link href="#" className="block">
                <img src="/placeholder.svg?height=40&width=120" alt="Get it on Google Play" className="h-10" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TrainEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

