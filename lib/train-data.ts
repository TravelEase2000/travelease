export interface Station {
  id: string
  name: string
  code: string
  city: string
  state: string
  country: string
  lat: number
  lng: number
}

export interface TrainType {
  id: string
  name: string
  number: string
  type: "Rajdhani" | "Shatabdi" | "Duronto" | "Superfast" | "Express" | "Passenger"
  amenities: string[]
}

export interface TrainSchedule {
  id: string
  trainId: string
  departureStationId: string
  arrivalStationId: string
  departureTime: string
  arrivalTime: string
  duration: string
  distance: number
  price: number
  seatsAvailable: number
  date: string
}

export interface TrainResult extends TrainSchedule {
  train: TrainType
  departureStation: Station
  arrivalStation: Station
}

// Mock data for Indian stations
export const stations: Station[] = [
  {
    id: "station-1",
    name: "New Delhi Railway Station",
    code: "NDLS",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    lat: 28.6419,
    lng: 77.2194,
  },
  {
    id: "station-2",
    name: "Mumbai Central",
    code: "MMCT",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    lat: 18.9691,
    lng: 72.8193,
  },
  {
    id: "station-3",
    name: "Howrah Junction",
    code: "HWH",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    lat: 22.5958,
    lng: 88.3425,
  },
  {
    id: "station-4",
    name: "Chennai Central",
    code: "MAS",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    lat: 13.0827,
    lng: 80.2707,
  },
  {
    id: "station-5",
    name: "Bengaluru City Junction",
    code: "SBC",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    lat: 12.9784,
    lng: 77.5738,
  },
  {
    id: "station-6",
    name: "Hyderabad Deccan",
    code: "HYB",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    lat: 17.385,
    lng: 78.4867,
  },
  {
    id: "station-7",
    name: "Ahmedabad Junction",
    code: "ADI",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    lat: 23.0225,
    lng: 72.5714,
  },
  {
    id: "station-8",
    name: "Pune Junction",
    code: "PUNE",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    lat: 18.5285,
    lng: 73.8739,
  },
  {
    id: "station-9",
    name: "Jaipur Junction",
    code: "JP",
    city: "Jaipur",
    state: "Rajasthan",
    country: "India",
    lat: 26.9239,
    lng: 75.7887,
  },
  {
    id: "station-10",
    name: "Lucknow Charbagh",
    code: "LKO",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    lat: 26.8312,
    lng: 80.9162,
  },
]

// Mock data for Indian train types
export const trainTypes: TrainType[] = [
  {
    id: "train-type-1",
    name: "Rajdhani Express",
    number: "12301",
    type: "Rajdhani",
    amenities: ["WiFi", "Food Service", "Power Outlets", "Bedding", "Air Conditioning"],
  },
  {
    id: "train-type-2",
    name: "Shatabdi Express",
    number: "12002",
    type: "Shatabdi",
    amenities: ["WiFi", "Food Service", "Power Outlets", "Executive Chair Car", "Air Conditioning"],
  },
  {
    id: "train-type-3",
    name: "Duronto Express",
    number: "12213",
    type: "Duronto",
    amenities: ["WiFi", "Food Service", "Power Outlets", "Bedding", "Air Conditioning"],
  },
  {
    id: "train-type-4",
    name: "Jan Shatabdi Express",
    number: "12051",
    type: "Superfast",
    amenities: ["WiFi", "Pantry Car", "Power Outlets"],
  },
  {
    id: "train-type-5",
    name: "Garib Rath Express",
    number: "12203",
    type: "Express",
    amenities: ["Air Conditioning", "Budget Friendly", "Bedding"],
  },
]

// Mock data for train schedules
export const trainSchedules: TrainSchedule[] = [
  // Delhi to Mumbai
  {
    id: "schedule-1",
    trainId: "train-type-1",
    departureStationId: "station-1",
    arrivalStationId: "station-2",
    departureTime: "16:25",
    arrivalTime: "08:15",
    duration: "15h 50m",
    distance: 1384,
    price: 2250.0,
    seatsAvailable: 42,
    date: "2025-03-15",
  },
  {
    id: "schedule-2",
    trainId: "train-type-3",
    departureStationId: "station-1",
    arrivalStationId: "station-2",
    departureTime: "22:30",
    arrivalTime: "16:35",
    duration: "18h 05m",
    distance: 1384,
    price: 1850.0,
    seatsAvailable: 76,
    date: "2025-03-15",
  },
  // Delhi to Kolkata
  {
    id: "schedule-3",
    trainId: "train-type-1",
    departureStationId: "station-1",
    arrivalStationId: "station-3",
    departureTime: "16:55",
    arrivalTime: "10:00",
    duration: "17h 05m",
    distance: 1472,
    price: 2350.0,
    seatsAvailable: 32,
    date: "2025-03-15",
  },
  // Mumbai to Chennai
  {
    id: "schedule-4",
    trainId: "train-type-2",
    departureStationId: "station-2",
    arrivalStationId: "station-4",
    departureTime: "05:40",
    arrivalTime: "21:20",
    duration: "15h 40m",
    distance: 1280,
    price: 1950.0,
    seatsAvailable: 54,
    date: "2025-03-15",
  },
  // Bengaluru to Hyderabad
  {
    id: "schedule-5",
    trainId: "train-type-4",
    departureStationId: "station-5",
    arrivalStationId: "station-6",
    departureTime: "20:00",
    arrivalTime: "08:30",
    duration: "12h 30m",
    distance: 570,
    price: 850.0,
    seatsAvailable: 120,
    date: "2025-03-15",
  },
  // Ahmedabad to Pune
  {
    id: "schedule-6",
    trainId: "train-type-5",
    departureStationId: "station-7",
    arrivalStationId: "station-8",
    departureTime: "23:45",
    arrivalTime: "12:30",
    duration: "12h 45m",
    distance: 650,
    price: 750.0,
    seatsAvailable: 86,
    date: "2025-03-15",
  },
]

// Function to search for trains between stations on a specific date
export function searchTrains(fromStationId: string, toStationId: string, date: string): TrainResult[] {
  // In a real app, this would be an API call to IRCTC or similar service

  // Filter schedules based on stations and date
  const matchingSchedules = trainSchedules.filter(
    (schedule) =>
      schedule.departureStationId === fromStationId &&
      schedule.arrivalStationId === toStationId &&
      schedule.date === date,
  )

  // Map schedules to full train results with related data
  return matchingSchedules.map((schedule) => {
    const train = trainTypes.find((t) => t.id === schedule.trainId)!
    const departureStation = stations.find((s) => s.id === schedule.departureStationId)!
    const arrivalStation = stations.find((s) => s.id === schedule.arrivalStationId)!

    return {
      ...schedule,
      train,
      departureStation,
      arrivalStation,
    }
  })
}

// Function to get a train by ID
export function getTrainById(scheduleId: string): TrainResult | null {
  const schedule = trainSchedules.find((s) => s.id === scheduleId)

  if (!schedule) return null

  const train = trainTypes.find((t) => t.id === schedule.trainId)!
  const departureStation = stations.find((s) => s.id === schedule.departureStationId)!
  const arrivalStation = stations.find((s) => s.id === schedule.arrivalStationId)!

  return {
    ...schedule,
    train,
    departureStation,
    arrivalStation,
  }
}

// Function to get stations for autocomplete
export function getStations(query: string): Station[] {
  if (!query) return stations.slice(0, 5)

  const lowerQuery = query.toLowerCase()
  return stations
    .filter(
      (station) =>
        station.name.toLowerCase().includes(lowerQuery) ||
        station.city.toLowerCase().includes(lowerQuery) ||
        station.code.toLowerCase().includes(lowerQuery),
    )
    .slice(0, 5)
}

// Function to calculate distance between two points using the Haversine formula
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return d
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}

// IRCTC API integration (mock implementation)
export async function fetchTrainsFromIRCTC(from: string, to: string, date: string) {
  // In a real implementation, this would make an API call to IRCTC
  // For demo purposes, we'll return our mock data

  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const fromStation = stations.find((s) => s.code === from || s.id === from)
    const toStation = stations.find((s) => s.code === to || s.id === to)

    if (!fromStation || !toStation) {
      return { success: false, error: "Station not found" }
    }

    const results = searchTrains(fromStation.id, toStation.id, date)
    return { success: true, data: results }
  } catch (error) {
    return { success: false, error: "Failed to fetch trains" }
  }
}

