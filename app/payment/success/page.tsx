import { Card } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Card className="w-full max-w-md p-6 text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <Icons.check className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">Payment Successful!</h2>
        <p className="text-sm text-muted-foreground">
          Your ticket has been booked successfully. You can view your ticket in your profile.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/profile">
              <Icons.user className="h-4 w-4 mr-2" />
              View Ticket
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <Icons.home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
} 