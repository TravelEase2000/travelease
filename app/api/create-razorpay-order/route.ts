import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency, paymentId } = body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to smallest currency unit
      currency,
      receipt: paymentId,
      notes: {
        paymentId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
} 