import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, amount, paymentMethod, bookingDetails } = body;

    // Here you would integrate with your payment gateway (e.g., Stripe, Razorpay)
    // For now, we'll simulate a payment process

    // Record the payment in Firestore
    const payment = {
      userId,
      amount,
      paymentMethod,
      bookingDetails,
      status: 'completed',
      timestamp: serverTimestamp(),
    };

    const paymentRef = await addDoc(collection(db, 'payments'), payment);

    return NextResponse.json({
      success: true,
      message: 'Payment processed successfully',
      paymentId: paymentRef.id,
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Payment processing failed',
      },
      { status: 500 }
    );
  }
} 