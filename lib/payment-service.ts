import { loadStripe } from '@stripe/stripe-js';
import { db } from './firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentDetails {
  amount: number;
  currency: string;
  userId: string;
  bookingId: string;
  isStudent: boolean;
}

export class PaymentService {
  static async initiateStripePayment(details: PaymentDetails) {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Apply student discount if applicable
      const finalAmount = details.isStudent ? details.amount * 0.9 : details.amount;

      // Create a payment record in Firestore
      const paymentRef = await addDoc(collection(db, 'payments'), {
        userId: details.userId,
        bookingId: details.bookingId,
        amount: finalAmount,
        currency: details.currency,
        status: 'pending',
        provider: 'stripe',
        createdAt: new Date(),
      });

      // Create Stripe checkout session
      const response = await fetch('/api/create-stripe-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount,
          currency: details.currency,
          paymentId: paymentRef.id,
        }),
      });

      const session = await response.json();

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return { success: true, paymentId: paymentRef.id };
    } catch (error) {
      console.error('Payment initiation failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Payment failed' };
    }
  }

  static async initiateRazorpayPayment(details: PaymentDetails) {
    try {
      // Create a payment record in Firestore
      const paymentRef = await addDoc(collection(db, 'payments'), {
        userId: details.userId,
        bookingId: details.bookingId,
        amount: details.amount,
        currency: details.currency,
        status: 'pending',
        provider: 'razorpay',
        createdAt: new Date(),
      });

      // Initialize Razorpay
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: details.amount,
          currency: details.currency,
          paymentId: paymentRef.id,
        }),
      });

      const order = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: details.amount,
        currency: details.currency,
        name: 'TravelEase',
        description: 'Train Ticket Booking',
        order_id: order.id,
        handler: async (response: any) => {
          // Verify payment on the backend
          const verifyResponse = await fetch('/api/verify-razorpay-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentId: paymentRef.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });

          const verification = await verifyResponse.json();

          if (verification.success) {
            await updateDoc(doc(db, 'payments', paymentRef.id), {
              status: 'completed',
              razorpayPaymentId: response.razorpay_payment_id,
            });
          }
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
        },
        theme: {
          color: '#10B981',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

      return { success: true, paymentId: paymentRef.id };
    } catch (error) {
      console.error('Razorpay payment initiation failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Payment failed' };
    }
  }
} 