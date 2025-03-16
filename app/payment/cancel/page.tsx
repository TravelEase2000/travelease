import { Card } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Card className="w-full max-w-md p-6 text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <Icons.warning className="h-6 w-6 text-destructive" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">Payment Cancelled</h2>
        <p className="text-sm text-muted-foreground">
          Your payment was cancelled. Please try again if you wish to complete your booking.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/">
              <Icons.home className="h-4 w-4 mr-2" />
              Try Again
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
} 