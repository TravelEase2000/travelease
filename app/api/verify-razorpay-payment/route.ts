import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    // Verify signature
    const text = `${razorpayOrderId}|${razorpayPaymentId}`;
    const signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET!)
      .update(text)
      .digest('hex');

    const isAuthentic = signature === razorpaySignature;

    if (isAuthentic) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment verification failed:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
} 