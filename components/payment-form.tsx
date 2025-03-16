import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useToast } from '@/components/ui/use-toast';
import { PaymentService } from '@/lib/payment-service';
import { useAuth } from '@/lib/auth-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PaymentFormProps {
  amount: number;
  bookingId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function PaymentForm({ amount, bookingId, onSuccess, onCancel }: PaymentFormProps) {
  const { user, isStudent } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleStripePayment = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue with the payment.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await PaymentService.initiateStripePayment({
        amount,
        currency: 'inr',
        userId: user.uid,
        bookingId,
        isStudent: isStudent || false,
      });

      if (!result.success) {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to process payment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPayment = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue with the payment.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await PaymentService.initiateRazorpayPayment({
        amount,
        currency: 'INR',
        userId: user.uid,
        bookingId,
        isStudent: isStudent || false,
      });

      if (!result.success) {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to process payment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Complete Payment</h3>
          <p className="text-sm text-muted-foreground">
            Choose your preferred payment method
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Amount:</p>
          <p className="text-lg font-bold">
            ₹{amount.toFixed(2)}
            {isStudent && (
              <span className="ml-2 text-sm text-primary">(Student Discount Applied)</span>
            )}
          </p>
        </div>

        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="card">Card Payment</TabsTrigger>
            <TabsTrigger value="upi">UPI Payment</TabsTrigger>
          </TabsList>
          <TabsContent value="card" className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Icons.billing className="h-4 w-4" />
                <span className="text-sm">Pay securely with credit/debit card</span>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={handleStripePayment}
              disabled={loading}
            >
              {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Pay with Card
            </Button>
          </TabsContent>
          <TabsContent value="upi" className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Icons.shield className="h-4 w-4" />
                <span className="text-sm">Pay using UPI/Net Banking</span>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={handleRazorpayPayment}
              disabled={loading}
            >
              {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Pay with UPI
            </Button>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-muted-foreground">
          <p>By proceeding with the payment, you agree to our terms and conditions</p>
        </div>
      </div>
    </Card>
  );
} 