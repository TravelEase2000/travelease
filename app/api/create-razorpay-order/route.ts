import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Check if required environment variables are present
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_SECRET) {
  console.warn('Razorpay credentials are not configured. Payment functionality will be disabled.');
}

// Initialize Razorpay only if credentials are available
const razorpay = RAZORPAY_KEY_ID && RAZORPAY_SECRET
  ? new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_SECRET,
    })
  : null;

export async function POST(req: Request) {
  try {
    // Check if Razorpay is properly initialized
    if (!razorpay) {
      return NextResponse.json(
        { error: 'Payment gateway is not configured' },
        { status: 503 }
      );
    }

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