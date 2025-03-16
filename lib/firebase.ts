// Import the Firebase SDK
import { initializeApp, getApps } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth"
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, query, where, getDocs } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// Authentication functions
export async function signUp(email: string, password: string, name: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update user profile with name
    await updateProfile(user, {
      displayName: name,
    })

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: email,
      name: name,
      isStudent: email.endsWith(".edu") || email.endsWith(".ac.in"),
      createdAt: new Date().toISOString(),
      bookings: [],
    })

    return { success: true, user }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function logOut() {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// User data functions
export async function getUserData(uid: string) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() }
    } else {
      return { success: false, error: "User not found" }
    }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Booking functions
export async function createBooking(uid: string, bookingData: any) {
  try {
    // Create a new booking document
    const bookingsRef = collection(db, "bookings")
    const newBookingRef = doc(bookingsRef)
    const bookingId = newBookingRef.id

    const booking = {
      id: bookingId,
      userId: uid,
      ...bookingData,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    }

    await setDoc(newBookingRef, booking)

    // Update user's bookings array
    const userRef = doc(db, "users", uid)
    const userData = await getDoc(userRef)

    if (userData.exists()) {
      const bookings = userData.data().bookings || []
      bookings.push(bookingId)

      await updateDoc(userRef, {
        bookings: bookings,
      })
    }

    return { success: true, bookingId, booking }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getUserBookings(uid: string) {
  try {
    const bookingsQuery = query(collection(db, "bookings"), where("userId", "==", uid))
    const querySnapshot = await getDocs(bookingsQuery)

    const bookings: any[] = []
    querySnapshot.forEach((doc) => {
      bookings.push(doc.data())
    })

    return { success: true, bookings }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export { app, auth, db, storage }

