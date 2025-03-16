# TravelEase - Student Train Booking Platform

A modern train booking platform built specifically for students, offering discounted rates and a seamless booking experience.

## Features

- 🎓 Student verification and discounts
- 🎫 Digital ticket system with QR codes
- 💳 Multiple payment options (Stripe & Razorpay)
- 🌙 Dark mode support
- 📱 Responsive design
- 🔒 Secure authentication
- 📊 Analytics dashboard
- 👥 Referral system

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Firebase (Authentication & Firestore)
- Stripe & Razorpay Payment Integration
- Shadcn UI Components

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/travelease.git
cd travelease
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
# Application URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The application is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure the environment variables
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 