import type {
  BusOperator,
  BusRoute,
  Dish,
  Hotel,
  HotelCollection,
  HotelReview,
  Restaurant,
} from "./types";
import type { RoomCategory, BusRegion } from "./types";

export const regions = [
  "Far North",
  "North",
  "Adamawa",
  "North West",
  "West",
  "East",
  "Central",
  "Littoral",
  "South",
  "South West",
];
export const formatPrice = (price: number, currency = "XAF") =>
  `${new Intl.NumberFormat("en-US").format(price)} ${currency}`;

export const formatDuration = ({
  hours,
  minutes,
}: {
  hours: number;
  minutes: number;
}) => `${hours}h ${String(minutes).padStart(2, "0")}m`;

const roomImages = [
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjByb29tfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWwlMjByb29tfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
];

export const roomTypes: RoomCategory[] = [
  "Standard",
  "Deluxe",
  "Suite",
  "Family",
  "Villa",
  "Studio",
  "Cabin",
  "Penthouse",
  "Twin",
];

const restaurantImage = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MTV8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1556745750-68295fefafc5?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
];

const foodImages = [
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1665332561290-cc6757172890?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QWZyaWNhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QWZyaWNhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1604329756574-bda1f2cada6f?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEFmcmljYW4lMjBmb29kfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1743674453123-93356ade2891?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEFmcmljYW4lMjBmb29kfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1665833613236-7c1d087463b1?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEFmcmljYW4lMjBmb29kfGVufDB8fDB8fHww",
];

const busStations = [
  "https://images.unsplash.com/photo-1697376372218-924061ffe9d5?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJ1cyUyMHN0YXRpb258ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1563359250-602107d96e47?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1cyUyMHN0YXRpb258ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1503902082432-d2ba320b72ef?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJ1cyUyMHN0YXRpb258ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1658313550850-d82e5ff38ba3?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJ1cyUyMHN0YXRpb258ZW58MHx8MHx8fDA%3D",
];

const busImage = [
  "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1570118054363-ff4d296962f5?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJ1c3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJ1c3xlbnwwfHwwfHx8MA%3D%3D",
];

const hotelImages = [
  "/default.png",
  "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1709884735017-114f4a31f944?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=987&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544894079-e81a9eb1da8b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export const hotelCollections: HotelCollection[] = [
  {
    id: "coastal-escapes",
    slug: "coastal-escapes",
    name: "Coastal Escapes",
    description: "Ocean air, calm mornings, and stays made for slowing down.",
    image: hotelImages[0],
    hotelIds: ["krystal-palace", "mountain-view-lodge", "limbe-bay-resort"],
  },
  {
    id: "city-signatures",
    slug: "city-signatures",
    name: "City Signatures",
    description: "Central hotels for business, dining, and easy city access.",
    image: hotelImages[1],
    hotelIds: ["hilton-yaounde", "blue-pearl-douala", "mont-febe-residence"],
  },
  {
    id: "nature-retreats",
    slug: "nature-retreats",
    name: "Nature Retreats",
    description: "Quiet hideaways surrounded by Cameroon's green landscapes.",
    image: hotelImages[4],
    hotelIds: ["mountain-view-lodge", "savanna-house", "mont-febe-residence"],
  },
  {
    id: "heritage-stays",
    slug: "heritage-stays",
    name: "Heritage Stays",
    description: "Characterful stays shaped by local history and hospitality.",
    image: hotelImages[5],
    hotelIds: ["savanna-house", "blue-pearl-douala", "limbe-bay-resort"],
  },
];

const baseHotels: Hotel[] = [
  {
    id: "hilton-yaounde",
    slug: "hilton-yaounde",
    name: "Hilton Yaounde",
    tagline: "International comfort in the heart of the capital.",
    description:
      "A polished city stay with panoramic views, generous rooms, and attentive service for business and leisure travelers.",
    collectionIds: ["city-signatures"],
    city: "Yaounde",
    region: "Central",
    address: "Boulevard du 20 Mai, Centre Ville",
    rating: 4.8,
    reviewCount: 1240,
    image: hotelImages[2],
    images: [hotelImages[2], hotelImages[3], hotelImages[4]],
    startingPrice: 145000,
    currency: "XAF",
    amenities: [
      {
        id: "wifi",
        name: "High-speed WiFi",
        description: "Unlimited access throughout the property",
      },
      {
        id: "pool",
        name: "Swimming pool",
        description: "Outdoor pool with poolside service",
      },
      {
        id: "gym",
        name: "Fitness centre",
        description: "24/7 access to cardio and strength equipment",
      },
      {
        id: "dining",
        name: "On-site dining",
        description: "International and local dishes",
      },
      {
        id: "spa",
        name: "Wellness spa",
        description: "Massage and beauty treatments by appointment",
      },
    ],
    rooms: [
      {
        id: "hilton-deluxe-king",
        name: "Deluxe King Room",
        type: "Deluxe",
        availability: [{ checkIn: "2026-01-01", checkOut: "2026-01-28" }],
        description:
          "A bright room for couples and business travelers seeking quiet city comfort.",
        bed: "1 king bed",
        view: "City view",
        capacity: 2,
        size: 34,
        price: 145000,
        currency: "XAF",
        image: hotelImages[3],
        amenities: [
          "Work desk",
          "Rain shower",
          "Coffee station",
          "Blackout curtains",
        ],
        featured: true,
      },
      {
        id: "hilton-executive-suite",
        name: "Executive Suite",
        type: "Suite",
        availability: [{ checkIn: "2026-02-01", checkOut: "2026-02-28" }],
        description:
          "A separate living area and lounge access for longer or more productive stays.",
        bed: "1 king bed",
        view: "Hillside view",
        capacity: 3,
        size: 62,
        price: 245000,
        currency: "XAF",
        image: hotelImages[5],
        amenities: [
          "Separate lounge",
          "Executive lounge access",
          "Bathtub",
          "Breakfast included",
        ],
      },
      {
        id: "hilton-family-room",
        name: "Family Room",
        type: "Family",
        availability: [{ checkIn: "2026-03-01", checkOut: "2026-03-28" }],
        description:
          "Flexible sleeping arrangements and space for a relaxed family trip.",
        bed: "1 king bed and 1 twin bed",
        view: "Garden view",
        capacity: 4,
        size: 48,
        price: 195000,
        currency: "XAF",
        image: hotelImages[6],
        amenities: [
          "Two sleeping areas",
          "Mini fridge",
          "Child-friendly toiletries",
          "Late checkout on request",
        ],
      },
    ],
    checkIn: "14:00",
    checkOut: "12:00",
    policies: [
      "Free cancellation up to 24 hours before arrival.",
      "Children under 12 stay free using existing bedding.",
      "Service animals are welcome.",
    ],
    featured: true,
  },
  {
    id: "blue-pearl-douala",
    slug: "blue-pearl-douala",
    name: "Blue Pearl Douala",
    tagline: "A calm address in the centre of Akwa.",
    description:
      "A contemporary Douala base with warm service, easy access to business districts, and a rooftop view over the city.",
    collectionIds: ["city-signatures", "heritage-stays"],
    city: "Douala",
    region: "Littoral",
    address: "Rue Joffre, Akwa",
    rating: 4.9,
    reviewCount: 864,
    image: hotelImages[1],
    images: [hotelImages[1], hotelImages[6], hotelImages[7]],
    startingPrice: 80000,
    currency: "XAF",
    amenities: [
      {
        id: "wifi",
        name: "Fast WiFi",
        description: "Reliable internet in every room",
      },
      {
        id: "rooftop",
        name: "Rooftop terrace",
        description: "Sunset drinks and city views",
      },
      {
        id: "parking",
        name: "Secure parking",
        description: "Gated parking for overnight guests",
      },
      {
        id: "shuttle",
        name: "Airport transfers",
        description: "Pre-booked transfers to Douala airport",
      },
    ],
    rooms: [
      {
        id: "blue-pearl-standard",
        name: "Standard Queen Room",
        type: "Standard",
        availability: [{ checkIn: "2026-02-01", checkOut: "2026-02-28" }],
        description: "An efficient and comfortable room for short city stays.",
        bed: "1 queen bed",
        view: "Neighbourhood view",
        capacity: 2,
        size: 24,
        price: 80000,
        currency: "XAF",
        image: hotelImages[7],
        amenities: [
          "Smart TV",
          "Desk",
          "Walk-in shower",
          "Complimentary water",
        ],
        featured: true,
      },
      {
        id: "blue-pearl-deluxe",
        name: "Deluxe King Room",
        type: "Deluxe",
        availability: [{ checkIn: "2026-03-01", checkOut: "2026-03-28" }],
        description:
          "Extra floor space and a quiet corner for an unhurried stay.",
        bed: "1 king bed",
        view: "City view",
        capacity: 2,
        size: 32,
        price: 110000,
        currency: "XAF",
        image: hotelImages[0],
        amenities: [
          "Sofa corner",
          "Espresso machine",
          "Bathrobe",
          "Early breakfast on request",
        ],
      },
    ],
    checkIn: "13:00",
    checkOut: "11:00",
    policies: [
      "Free cancellation up to 24 hours before arrival.",
      "A valid ID is required at check-in.",
      "No smoking inside rooms.",
    ],
  },
  {
    id: "krystal-palace",
    slug: "krystal-palace",
    name: "Krystal Palace Kribi",
    tagline: "Beachfront calm on Cameroon's Atlantic coast.",
    description:
      "A relaxed seaside hotel with bright rooms, fresh seafood, and direct access to the beach.",
    collectionIds: ["coastal-escapes"],
    city: "Kribi",
    region: "South",
    address: "Boulevard de la Plage",
    rating: 4.7,
    reviewCount: 532,
    image: hotelImages[4],
    images: [hotelImages[4], hotelImages[5]],
    startingPrice: 120000,
    currency: "XAF",
    amenities: [
      {
        id: "beach",
        name: "Beach access",
        description: "Private path to the Atlantic shore",
      },
      {
        id: "pool",
        name: "Infinity pool",
        description: "Pool overlooking the beach",
      },
      {
        id: "dining",
        name: "Seafood restaurant",
        description: "Daily catch prepared to order",
      },
      {
        id: "wifi",
        name: "WiFi",
        description: "Available in rooms and common areas",
      },
    ],
    rooms: [
      {
        id: "krystal-garden-room",
        name: "Garden Room",
        type: "Standard",
        availability: [{ checkIn: "2026-03-01", checkOut: "2026-03-28" }],
        description: "A peaceful ground-floor room with a private terrace.",
        bed: "1 queen bed",
        view: "Garden view",
        capacity: 2,
        size: 28,
        price: 120000,
        currency: "XAF",
        image: hotelImages[6],
        amenities: [
          "Private terrace",
          "Mosquito net",
          "Mini fridge",
          "Outdoor seating",
        ],
      },
      {
        id: "krystal-ocean-suite",
        name: "Ocean Suite",
        type: "Suite",
        availability: [{ checkIn: "2026-04-01", checkOut: "2026-04-28" }],
        description: "A spacious suite with a balcony facing the Atlantic.",
        bed: "1 king bed",
        view: "Ocean view",
        capacity: 3,
        size: 50,
        price: 220000,
        currency: "XAF",
        image: hotelImages[7],
        amenities: [
          "Ocean balcony",
          "Living area",
          "Soaking tub",
          "Breakfast for two",
        ],
        featured: true,
      },
    ],
    checkIn: "14:00",
    checkOut: "12:00",
    policies: [
      "Beach access is subject to weather conditions.",
      "Children must be supervised near the pool.",
      "Pets are not accepted.",
    ],
    featured: true,
  },
  {
    id: "mountain-view-lodge",
    slug: "mountain-view-lodge",
    name: "Mountain View Lodge",
    tagline: "Cool air and wide views near Mount Cameroon.",
    description:
      "A nature-forward lodge for travelers who want forest walks, fresh food, and a slower rhythm.",
    collectionIds: ["coastal-escapes", "nature-retreats"],
    city: "Buea",
    region: "South West",
    address: "Molyko Hills, Buea",
    rating: 4.6,
    reviewCount: 318,
    image: hotelImages[5],
    images: [hotelImages[5], hotelImages[0]],
    startingPrice: 95000,
    currency: "XAF",
    amenities: [
      {
        id: "trail",
        name: "Guided trails",
        description: "Local guides available for mountain walks",
      },
      {
        id: "garden",
        name: "Kitchen garden",
        description: "Seasonal produce used in the lodge kitchen",
      },
      {
        id: "fireplace",
        name: "Fireplace lounge",
        description: "Evening gathering space",
      },
      { id: "wifi", name: "WiFi", description: "Available in the main lodge" },
    ],
    rooms: [
      {
        id: "mountain-cabin",
        name: "Forest Cabin",
        type: "Cabin",
        availability: [{ checkIn: "2026-04-01", checkOut: "2026-04-28" }],
        description: "A private cabin with a porch and views into the trees.",
        bed: "1 queen bed",
        view: "Forest view",
        capacity: 2,
        size: 30,
        price: 95000,
        currency: "XAF",
        image: hotelImages[1],
        amenities: [
          "Private porch",
          "Wood stove",
          "Breakfast basket",
          "Hiking map",
        ],
        featured: true,
      },
      {
        id: "mountain-family-cottage",
        name: "Family Cottage",
        type: "Family",
        availability: [{ checkIn: "2026-05-01", checkOut: "2026-05-28" }],
        description: "A two-bedroom cottage for families and small groups.",
        bed: "1 king bed and 2 twin beds",
        view: "Mountain view",
        capacity: 4,
        size: 68,
        price: 165000,
        currency: "XAF",
        image: hotelImages[2],
        amenities: [
          "Two bedrooms",
          "Kitchenette",
          "Dining porch",
          "Board games",
        ],
      },
    ],
    checkIn: "14:00",
    checkOut: "11:00",
    policies: [
      "Mountain excursions require advance booking.",
      "Quiet hours begin at 22:00.",
      "Children under 5 stay free.",
    ],
  },
  {
    id: "savanna-house",
    slug: "savanna-house",
    name: "Savanna House Garoua",
    tagline: "Warm northern hospitality with room to breathe.",
    description:
      "A welcoming base for northern excursions, with shaded courtyards and a kitchen inspired by local flavors.",
    collectionIds: ["nature-retreats", "heritage-stays"],
    city: "Garoua",
    region: "North",
    address: "Avenue des Etats Unis",
    rating: 4.5,
    reviewCount: 204,
    image: hotelImages[7],
    images: [hotelImages[7], hotelImages[3]],
    startingPrice: 70000,
    currency: "XAF",
    amenities: [
      {
        id: "courtyard",
        name: "Shaded courtyard",
        description: "A cool place to relax between outings",
      },
      {
        id: "dining",
        name: "Local dining",
        description: "Northern Cameroonian recipes",
      },
      {
        id: "parking",
        name: "Secure parking",
        description: "On-site guarded parking",
      },
      {
        id: "laundry",
        name: "Laundry service",
        description: "Same-day service available",
      },
    ],
    rooms: [
      {
        id: "savanna-classic",
        name: "Classic Room",
        type: "Standard",
        availability: [{ checkIn: "2026-05-01", checkOut: "2026-05-28" }],
        description:
          "A cool, practical room for travelers exploring the north.",
        bed: "1 double bed",
        view: "Courtyard view",
        capacity: 2,
        size: 22,
        price: 70000,
        currency: "XAF",
        image: hotelImages[0],
        amenities: [
          "Air conditioning",
          "Mosquito net",
          "Desk",
          "Filtered water",
        ],
      },
      {
        id: "savanna-suite",
        name: "Courtyard Suite",
        type: "Suite",
        availability: [{ checkIn: "2026-06-01", checkOut: "2026-06-28" }],
        description:
          "A larger suite with a sitting area and private courtyard access.",
        bed: "1 king bed",
        view: "Garden view",
        capacity: 3,
        size: 42,
        price: 125000,
        currency: "XAF",
        image: hotelImages[4],
        amenities: [
          "Sitting area",
          "Private courtyard",
          "Welcome fruit",
          "Airport transfer",
        ],
        featured: true,
      },
    ],
    checkIn: "13:00",
    checkOut: "12:00",
    policies: [
      "Safari transfers must be booked 24 hours ahead.",
      "No outside food in shared dining areas.",
      "Cash and mobile money accepted.",
    ],
  },
  {
    id: "limbe-bay-resort",
    slug: "limbe-bay-resort",
    name: "Limbe Bay Resort",
    tagline: "A breezy waterfront stay beside the botanical gardens.",
    description:
      "A relaxed resort for beach days, seafood lunches, and easy access to Limbe's black-sand coast.",
    collectionIds: ["coastal-escapes", "heritage-stays"],
    city: "Limbe",
    region: "South West",
    address: "Down Beach Road, Limbe",
    rating: 4.7,
    reviewCount: 289,
    image: hotelImages[3],
    images: [hotelImages[3], hotelImages[6], hotelImages[2]],
    startingPrice: 135000,
    currency: "XAF",
    amenities: [
      {
        id: "beach",
        name: "Waterfront access",
        description: "Direct access to the bay promenade",
      },
      {
        id: "restaurant",
        name: "Garden restaurant",
        description: "Fresh seafood and tropical produce",
      },
      {
        id: "pool",
        name: "Family pool",
        description: "Shallow end and shaded loungers",
      },
      {
        id: "kayak",
        name: "Kayak hire",
        description: "Equipment available from the concierge",
      },
    ],
    rooms: [
      {
        id: "limbe-garden-deluxe",
        name: "Garden Deluxe Room",
        type: "Deluxe",
        availability: [{ checkIn: "2026-06-01", checkOut: "2026-06-28" }],
        description:
          "A breezy room with a furnished terrace overlooking the gardens.",
        bed: "1 king bed",
        view: "Garden view",
        capacity: 2,
        size: 36,
        price: 135000,
        currency: "XAF",
        image: hotelImages[5],
        amenities: [
          "Private terrace",
          "Mini fridge",
          "Rain shower",
          "Breakfast for two",
        ],
        featured: true,
      },
      {
        id: "limbe-bay-villa",
        name: "Bay View Villa",
        type: "Villa",
        availability: [{ checkIn: "2026-01-01", checkOut: "2026-01-28" }],
        description:
          "A private villa with a living room and wide views across the water.",
        bed: "1 king bed and 1 sofa bed",
        view: "Bay view",
        capacity: 4,
        size: 74,
        price: 265000,
        currency: "XAF",
        image: hotelImages[1],
        amenities: [
          "Private plunge pool",
          "Living room",
          "Outdoor dining",
          "Butler service",
        ],
      },
    ],
    checkIn: "14:00",
    checkOut: "12:00",
    policies: [
      "Water activities are weather dependent.",
      "Children must be supervised around the pool.",
      "A refundable security deposit is required for villas.",
    ],
  },
  {
    id: "mont-febe-residence",
    slug: "mont-febe-residence",
    name: "Mont Febe Residence",
    tagline: "Quiet hillside rooms above Yaounde's green canopy.",
    description:
      "A refined hillside residence with spacious suites, cool evenings, and a peaceful retreat from the city centre.",
    collectionIds: ["city-signatures", "nature-retreats"],
    city: "Yaounde",
    region: "Central",
    address: "Mont Febe Road, Yaounde",
    rating: 4.6,
    reviewCount: 417,
    image: hotelImages[6],
    images: [hotelImages[6], hotelImages[2], hotelImages[0]],
    startingPrice: 110000,
    currency: "XAF",
    amenities: [
      {
        id: "view",
        name: "Hillside views",
        description: "Wide views across Yaounde's tree-lined hills",
      },
      {
        id: "tennis",
        name: "Tennis court",
        description: "Court access included for hotel guests",
      },
      {
        id: "shuttle",
        name: "City shuttle",
        description: "Scheduled transfers to the business district",
      },
      {
        id: "breakfast",
        name: "Breakfast room",
        description: "Local and continental breakfast each morning",
      },
    ],
    rooms: [
      {
        id: "mont-febe-studio",
        name: "Hillside Studio",
        type: "Studio",
        availability: [{ checkIn: "2026-01-01", checkOut: "2026-01-28" }],
        description:
          "A comfortable studio with a small lounge and a private balcony.",
        bed: "1 queen bed",
        view: "Hillside view",
        capacity: 2,
        size: 31,
        price: 110000,
        currency: "XAF",
        image: hotelImages[7],
        amenities: [
          "Private balcony",
          "Kitchenette",
          "Work desk",
          "Daily housekeeping",
        ],
      },
      {
        id: "mont-febe-presidential-suite",
        name: "Presidential Suite",
        type: "Suite",
        availability: [{ checkIn: "2026-02-01", checkOut: "2026-02-28" }],
        description:
          "A generous suite with separate entertaining and sleeping spaces.",
        bed: "1 king bed",
        view: "Panoramic city view",
        capacity: 3,
        size: 86,
        price: 290000,
        currency: "XAF",
        image: hotelImages[3],
        amenities: [
          "Separate lounge",
          "Dining table",
          "Bathtub",
          "Private airport transfer",
        ],
        featured: true,
      },
    ],
    checkIn: "14:00",
    checkOut: "12:00",
    policies: [
      "Quiet hours begin at 22:00.",
      "Tennis reservations are required.",
      "Long-stay rates are available for stays of seven nights or more.",
    ],
    featured: true,
  },
];

const additionalHotelNames = [
  ["Fako View Hotel", "Buea", "South West", "nature-retreats"],
  ["Atlantic Breeze Inn", "Limbe", "South West", "coastal-escapes"],
  ["Wouri Heights", "Douala", "Littoral", "city-signatures"],
  ["Mfoundi Garden Hotel", "Yaounde", "Central", "city-signatures"],
  ["Bamenda Highland Lodge", "Bamenda", "North West", "nature-retreats"],
  ["Noun Valley Retreat", "Foumban", "West", "heritage-stays"],
  ["Mungo Riverside Hotel", "Nkongsamba", "Littoral", "nature-retreats"],
  ["Edea River House", "Edea", "Littoral", "heritage-stays"],
  ["Korup Forest Lodge", "Kumba", "South West", "nature-retreats"],
  ["Bafoussam Central Hotel", "Bafoussam", "West", "city-signatures"],
  ["Mara Palm Resort", "Maroua", "Far North", "heritage-stays"],
  ["Benoue Safari Lodge", "Garoua", "North", "nature-retreats"],
] as const;

const additionalHotels: Hotel[] = additionalHotelNames.map(
  ([name, city, region, collectionId], index) => ({
    id: name.toLowerCase().replaceAll(" ", "-"),
    slug: name.toLowerCase().replaceAll(" ", "-"),
    name,
    tagline: `A considered stay in ${city}.`,
    description: `Comfortable rooms, local character, and thoughtful service for travelers exploring ${city} and ${region}.`,
    collectionIds: [collectionId],
    city,
    region,
    address: `Central ${city}, Cameroon`,
    rating: Number((4.3 + (index % 6) / 10).toFixed(1)),
    reviewCount: 120 + index * 37,
    image: hotelImages[(index + 1) % hotelImages.length],
    images: [
      hotelImages[(index + 1) % hotelImages.length],
      hotelImages[(index + 3) % hotelImages.length],
    ],
    startingPrice: 65000 + index * 7500,
    currency: "XAF",
    amenities: [
      {
        id: "wifi",
        name: "WiFi",
        description: "Available throughout the property",
      },
      {
        id: "dining",
        name: "Local dining",
        description: "Breakfast and regional specialties",
      },
      {
        id: "parking",
        name: "Secure parking",
        description: "On-site parking for guests",
      },
    ],
    rooms: [
      {
        id: `${name.toLowerCase().replaceAll(" ", "-")}-classic`,
        name: "Classic Room",
        type: "Standard",
        availability: [
          {
            checkIn: `2026-${String(((index + 7) % 6) + 1).padStart(2, "0")}-01`,
            checkOut: `2026-${String(((index + 7) % 6) + 1).padStart(2, "0")}-28`,
          },
        ],
        description:
          "A practical room with everything needed for a restful stay.",
        bed: "1 queen bed",
        view: "City or garden view",
        capacity: 2,
        size: 25,
        price: 65000 + index * 7500,
        currency: "XAF",
        image: hotelImages[(index + 2) % hotelImages.length],
        amenities: [
          "Work desk",
          "Air conditioning",
          "Walk-in shower",
          "Filtered water",
        ],
        featured: index % 4 === 0,
      },
      {
        id: `${name.toLowerCase().replaceAll(" ", "-")}-suite`,
        name: "Signature Suite",
        type: "Suite",
        availability: [
          {
            checkIn: `2026-${String(((index + 7 + 1) % 6) + 1).padStart(2, "0")}-01`,
            checkOut: `2026-${String(((index + 7 + 1) % 6) + 1).padStart(2, "0")}-28`,
          },
        ],
        description: "A larger room with a sitting area for longer stays.",
        bed: "1 king bed",
        view: "Panoramic view",
        capacity: 3,
        size: 45,
        price: 105000 + index * 9000,
        currency: "XAF",
        image: hotelImages[(index + 4) % hotelImages.length],
        amenities: [
          "Sitting area",
          "Mini fridge",
          "Private balcony",
          "Breakfast for two",
        ],
      },
    ],
    checkIn: "14:00",
    checkOut: "12:00",
    policies: [
      "Free cancellation up to 24 hours before arrival.",
      "A valid ID is required at check-in.",
    ],
    featured: index % 5 === 0,
  }),
);

export const hotels: Hotel[] = [...baseHotels, ...additionalHotels];

const threeImageHotels = new Set([
  "blue-pearl-douala",
  "limbe-bay-resort",
  "mont-febe-residence",
]);

hotels.forEach((hotel) => {
  const imageCount = threeImageHotels.has(hotel.id) ? 3 : 4;
  hotel.images = [...hotel.images, ...hotelImages].slice(0, imageCount);
});

const roomAdditions = [
  {
    name: "Comfort Twin Room",
    type: "Twin" as const,
    description:
      "A flexible room with two separate beds for friends or family.",
    bed: "2 twin beds",
    view: "Garden view",
    capacity: 2,
    size: 30,
    priceOffset: 15000,
  },
  {
    name: "Family Residence",
    type: "Family" as const,
    description: "A spacious residence with room for relaxed family stays.",
    bed: "1 king bed and 2 twin beds",
    view: "Pool or garden view",
    capacity: 5,
    size: 58,
    priceOffset: 65000,
  },
  {
    name: "Premium Penthouse",
    type: "Penthouse" as const,
    description:
      "An elevated suite with generous living space and signature views.",
    bed: "1 king bed and 1 sofa bed",
    view: "Panoramic view",
    capacity: 4,
    size: 78,
    priceOffset: 125000,
  },
] as const;

const getRoomType = (name: string): RoomCategory => {
  const normalizedName = name.toLowerCase();
  const matchingType = roomTypes.find((roomType) =>
    normalizedName.includes(roomType.toLowerCase()),
  );

  return matchingType ?? "Standard";
};

hotels.forEach((hotel, hotelIndex) => {
  const hotelImagesForRoom =
    hotel.images.length > 0 ? hotel.images : [hotel.image];
  hotel.rooms = hotel.rooms.map((room, roomIndex) => ({
    ...room,
    type: room.type ?? getRoomType(room.name),
    images: room.images ?? [
      room.image,
      roomImages[(roomIndex + hotelIndex) % roomImages.length],
      roomImages[(roomIndex + hotelIndex + 1) % roomImages.length],
      roomImages[(roomIndex + hotelIndex + 2) % roomImages.length],
    ],
    availability: room.availability ?? [
      {
        checkIn: `2026-${String(((hotelIndex + roomIndex) % 6) + 1).padStart(2, "0")}-01`,
        checkOut: `2026-${String(((hotelIndex + roomIndex) % 6) + 1).padStart(2, "0")}-28`,
      },
    ],
    premium: room.premium ?? room.price >= hotel.startingPrice * 1.6,
    popular: room.popular ?? room.featured ?? roomIndex === 0,
  }));

  while (hotel.rooms.length < 5) {
    const roomIndex = hotel.rooms.length;
    const addition = roomAdditions[roomIndex - 2];
    const image = roomImages[(roomIndex + hotelIndex) % roomImages.length];
    hotel.rooms.push({
      id: `${hotel.id}-room-${roomIndex + 1}`,
      name: addition.name,
      type: addition.type,
      description: addition.description,
      bed: addition.bed,
      view: addition.view,
      capacity: addition.capacity,
      size: addition.size,
      price: hotel.startingPrice + addition.priceOffset,
      currency: hotel.currency,
      image,
      images: [
        image,
        roomImages[(roomIndex + hotelIndex + 1) % roomImages.length],
        roomImages[(roomIndex + hotelIndex + 2) % roomImages.length],
        roomImages[(roomIndex + hotelIndex + 3) % roomImages.length],
      ],
      availability: [
        {
          checkIn: `2026-${String(((hotelIndex + roomIndex) % 6) + 1).padStart(2, "0")}-01`,
          checkOut: `2026-${String(((hotelIndex + roomIndex) % 6) + 1).padStart(2, "0")}-28`,
        },
      ],
      amenities: [
        "Air conditioning",
        "Work desk",
        "Walk-in shower",
        "Filtered water",
      ],
      premium: addition.name === "Premium Penthouse",
      popular: roomIndex === 2,
    });
  }
});

hotelCollections.forEach((collection) => {
  collection.hotelIds.push(
    ...additionalHotels
      .filter((hotel) => hotel.collectionIds.includes(collection.id))
      .map((hotel) => hotel.id),
  );
});

const reviewMessages = [
  "The room was spotless, the staff were kind, and the whole stay felt effortless.",
  "A comfortable base with thoughtful details and a location that made exploring easy.",
  "The service was warm and professional. I would happily stay here again.",
  "Everything matched the description, especially the room comfort and breakfast.",
  "A peaceful stay with excellent hospitality and genuinely helpful staff.",
];

const guestNames = [
  ["Emmanuel M.", "EM"],
  ["Nadia T.", "NT"],
  ["Samuel K.", "SK"],
  ["Clara B.", "CB"],
  ["Patrick A.", "PA"],
] as const;

hotels.forEach((hotel, hotelIndex) => {
  const collectionLabel = hotel.collectionIds
    .map(
      (collectionId) =>
        hotelCollections.find((collection) => collection.id === collectionId)
          ?.name,
    )
    .filter(Boolean)
    .join(" and ");

  hotel.description = `${hotel.description} As part of our ${collectionLabel} collection, this property is designed for travelers who value local character, dependable comfort, and an easy sense of arrival. Guests can settle into thoughtfully prepared rooms, enjoy the hotel's signature amenities, and use it as a welcoming base for discovering ${hotel.city} and the wider ${hotel.region} region.`;
  hotel.reviews = guestNames.map(
    ([guestName, guestInitials], reviewIndex): HotelReview => ({
      id: `${hotel.id}-review-${reviewIndex + 1}`,
      guestName,
      guestInitials,
      stayDate: [
        "January 2026",
        "March 2026",
        "May 2026",
        "June 2026",
        "August 2026",
      ][reviewIndex],
      rating: Math.max(
        4,
        Math.min(
          5,
          hotel.rating - ((hotelIndex + reviewIndex) % 3 === 0 ? 0.1 : 0),
        ),
      ),
      message: `${reviewMessages[(hotelIndex + reviewIndex) % reviewMessages.length]} ${hotel.name} made ${hotel.city} feel easy to enjoy.`,
    }),
  );
});

const baseBusOperators: BusOperator[] = [
  {
    id: "finexs-voyages",
    name: "Finexs Voyages",
    description: "Premium inter-city travel with dependable schedules.",
    logo: busImage[0],
    rating: 4.8,
    amenities: [
      "WiFi",
      "Charging ports",
      "Air conditioning",
      "Refreshments",
      "Extra legroom",
    ],
    classes: ["VIP", "Classic"],
    featured: true,
  },
  {
    id: "general-express",
    name: "General Express",
    description: "Comfortable daily service connecting major cities.",
    logo: busImage[1],
    rating: 4.5,
    amenities: ["Charging ports", "Air conditioning", "Extra legroom"],
    classes: ["VIP", "Classic"],
  },
  {
    id: "buca-voyages",
    name: "Buca Voyages",
    description: "Friendly regional service with flexible departure times.",
    logo: busImage[2],
    rating: 4.4,
    amenities: ["Air conditioning", "Charging ports"],
    classes: ["Classic"],
  },
];

const additionalBusOperators: BusOperator[] = Array.from(
  { length: 17 },
  (_, index) => ({
    id: `cameroon-transit-${index + 4}`,
    name: `Cameroon Transit ${index + 4}`,
    description:
      "Reliable regional service with clean coaches and helpful staff.",
    logo: busImage[index % busImage.length],
    rating: Number((4.1 + (index % 7) / 10).toFixed(1)),
    amenities:
      index % 2 === 0
        ? ["Air conditioning", "Charging ports", "Extra legroom"]
        : ["Air conditioning", "Charging ports"],
    classes: index % 3 === 0 ? ["VIP", "Classic"] : ["Classic"],
    featured: index === 3 || index === 10,
  }),
);

export const busOperators: BusOperator[] = [
  ...baseBusOperators,
  ...additionalBusOperators,
];

const cityRegions: Record<string, BusRegion> = {
  Douala: "Littoral",
  Yaounde: "Central",
  Bafoussam: "North West",
  Kribi: "South East",
  Bamenda: "North West",
  Buea: "South West",
  Bertoua: "North East",
  Ebolowa: "South East",
  Garoua: "North East",
  Maroua: "North East",
  Ngaoundere: "North East",
  Edea: "Littoral",
  Limbe: "South West",
  Kumba: "South West",
  Foumban: "Central",
  Nkongsamba: "Littoral",
};

const baseBusRoutes: BusRoute[] = [
  {
    id: "douala-yaounde",
    slug: "douala-yaounde",
    origin: "Douala",
    destination: "Yaounde",
    region: "Littoral",
    originStation: "Akwa Central Station",
    destinationStation: "Mvan Station",
    duration: { hours: 3, minutes: 45 },
    distanceKm: 243,
    frequency: "Every 30 minutes",
    image: busStations[0],
    departures: [
      {
        id: "dy-0630",
        operatorId: "finexs-voyages",
        departureTime: "06:30",
        arrivalTime: "10:15",
        duration: { hours: 3, minutes: 45 },
        class: "VIP",
        price: 6500,
        availableSeats: 18,
        amenities: [
          "WiFi",
          "Charging ports",
          "Air conditioning",
          "Refreshments",
          "Extra legroom",
        ],
      },
      {
        id: "dy-0830",
        operatorId: "general-express",
        departureTime: "08:30",
        arrivalTime: "12:45",
        duration: { hours: 4, minutes: 15 },
        class: "Classic",
        price: 5000,
        availableSeats: 32,
        amenities: ["Charging ports", "Air conditioning"],
      },
      {
        id: "dy-1100",
        operatorId: "buca-voyages",
        departureTime: "11:00",
        arrivalTime: "15:30",
        duration: { hours: 4, minutes: 30 },
        class: "Classic",
        price: 4500,
        availableSeats: 26,
        amenities: ["Air conditioning", "Charging ports"],
      },
    ],
    featured: true,
  },
  {
    id: "yaounde-bafoussam",
    slug: "yaounde-bafoussam",
    origin: "Yaounde",
    destination: "Bafoussam",
    region: "Central",
    originStation: "Mvan Station",
    destinationStation: "Bamendzi Station",
    duration: { hours: 5, minutes: 30 },
    distanceKm: 292,
    frequency: "Every 60 minutes",
    image: busStations[1],
    departures: [
      {
        id: "yb-0700",
        operatorId: "finexs-voyages",
        departureTime: "07:00",
        arrivalTime: "12:30",
        duration: { hours: 5, minutes: 30 },
        class: "VIP",
        price: 9000,
        availableSeats: 14,
        amenities: [
          "WiFi",
          "Charging ports",
          "Air conditioning",
          "Refreshments",
        ],
      },
      {
        id: "yb-0930",
        operatorId: "general-express",
        departureTime: "09:30",
        arrivalTime: "15:15",
        duration: { hours: 5, minutes: 45 },
        class: "Classic",
        price: 7000,
        availableSeats: 41,
        amenities: ["Charging ports", "Air conditioning"],
      },
    ],
    featured: true,
  },
  {
    id: "douala-kribi",
    slug: "douala-kribi",
    origin: "Douala",
    destination: "Kribi",
    region: "Littoral",
    originStation: "Bonaberi Station",
    destinationStation: "Kribi Central Station",
    duration: { hours: 3, minutes: 15 },
    distanceKm: 173,
    frequency: "Every 90 minutes",
    image: busStations[2],
    departures: [
      {
        id: "dk-0730",
        operatorId: "buca-voyages",
        departureTime: "07:30",
        arrivalTime: "10:45",
        duration: { hours: 3, minutes: 15 },
        class: "Classic",
        price: 5500,
        availableSeats: 28,
        amenities: ["Air conditioning", "Charging ports"],
      },
      {
        id: "dk-1230",
        operatorId: "general-express",
        departureTime: "12:30",
        arrivalTime: "15:45",
        duration: { hours: 3, minutes: 15 },
        class: "Classic",
        price: 5500,
        availableSeats: 35,
        amenities: ["Charging ports", "Air conditioning", "Extra legroom"],
      },
    ],
  },
  {
    id: "bamenda-buea",
    slug: "bamenda-buea",
    origin: "Bamenda",
    destination: "Buea",
    region: "North West",
    originStation: "Commercial Avenue Station",
    destinationStation: "Molyko Station",
    duration: { hours: 7, minutes: 0 },
    distanceKm: 403,
    frequency: "Every 2 hours",
    image: busStations[3],
    departures: [
      {
        id: "bb-0600",
        operatorId: "general-express",
        departureTime: "06:00",
        arrivalTime: "13:00",
        duration: { hours: 7, minutes: 0 },
        class: "VIP",
        price: 12000,
        availableSeats: 11,
        amenities: ["Charging ports", "Air conditioning", "Extra legroom"],
      },
      {
        id: "bb-0800",
        operatorId: "buca-voyages",
        departureTime: "08:00",
        arrivalTime: "15:30",
        duration: { hours: 7, minutes: 30 },
        class: "Classic",
        price: 9500,
        availableSeats: 30,
        amenities: ["Air conditioning"],
      },
    ],
  },
  {
    id: "douala-bafoussam",
    slug: "douala-bafoussam",
    origin: "Douala",
    destination: "Bafoussam",
    region: "Littoral",
    originStation: "Bonaberi Station",
    destinationStation: "Bamendzi Station",
    duration: { hours: 6, minutes: 0 },
    distanceKm: 328,
    frequency: "Every 90 minutes",
    image: busStations[0],
    departures: [
      {
        id: "db-0600",
        operatorId: "finexs-voyages",
        departureTime: "06:00",
        arrivalTime: "12:00",
        duration: { hours: 6, minutes: 0 },
        class: "VIP",
        price: 10500,
        availableSeats: 16,
        amenities: [
          "WiFi",
          "Charging ports",
          "Air conditioning",
          "Refreshments",
          "Extra legroom",
        ],
      },
      {
        id: "db-0900",
        operatorId: "general-express",
        departureTime: "09:00",
        arrivalTime: "15:15",
        duration: { hours: 6, minutes: 15 },
        class: "Classic",
        price: 8000,
        availableSeats: 37,
        amenities: ["Charging ports", "Air conditioning"],
      },
    ],
  },
  {
    id: "yaounde-bertoua",
    slug: "yaounde-bertoua",
    origin: "Yaounde",
    destination: "Bertoua",
    region: "Central",
    originStation: "Mvan Station",
    destinationStation: "Central Market Station",
    duration: { hours: 5, minutes: 0 },
    distanceKm: 350,
    frequency: "Every 2 hours",
    image: busStations[1],
    departures: [
      {
        id: "ybe-0700",
        operatorId: "general-express",
        departureTime: "07:00",
        arrivalTime: "12:00",
        duration: { hours: 5, minutes: 0 },
        class: "VIP",
        price: 9500,
        availableSeats: 12,
        amenities: ["Charging ports", "Air conditioning", "Extra legroom"],
      },
      {
        id: "ybe-1000",
        operatorId: "buca-voyages",
        departureTime: "10:00",
        arrivalTime: "15:30",
        duration: { hours: 5, minutes: 30 },
        class: "Classic",
        price: 7500,
        availableSeats: 29,
        amenities: ["Air conditioning", "Charging ports"],
      },
    ],
  },
];

const additionalRouteNames = [
  ["Yaounde", "Ebolowa"],
  ["Douala", "Buea"],
  ["Bafoussam", "Bamenda"],
  ["Garoua", "Maroua"],
  ["Maroua", "Ngaoundere"],
  ["Bertoua", "Yaounde"],
  ["Kribi", "Edea"],
  ["Limbe", "Douala"],
  ["Kumba", "Buea"],
  ["Foumban", "Yaounde"],
  ["Nkongsamba", "Douala"],
  ["Edea", "Yaounde"],
  ["Bamenda", "Yaounde"],
  ["Maroua", "Garoua"],
] as const;

const additionalBusRoutes: BusRoute[] = additionalRouteNames.map(
  ([origin, destination], index) => {
    const durationHours = 2 + (index % 5);
    const durationMinutes = index % 2 === 0 ? 30 : 0;
    const operatorId = busOperators[(index + 1) % busOperators.length].id;
    const routeId = `${origin}-${destination}`
      .toLowerCase()
      .replaceAll(" ", "-");
    const price = 4500 + index * 500;

    return {
      id: routeId,
      slug: routeId,
      origin,
      destination,
      region: cityRegions[origin] ?? "Central",
      originStation: `${origin} Central Station`,
      destinationStation: `${destination} Main Station`,
      duration: { hours: durationHours, minutes: durationMinutes },
      distanceKm: 140 + index * 31,
      frequency: index % 2 === 0 ? "Every 60 minutes" : "Every 90 minutes",
      image: busStations[index % busStations.length],
      departures: [
        {
          id: `${routeId}-vip`,
          operatorId,
          departureTime: "06:30",
          arrivalTime: `${String(6 + durationHours).padStart(2, "0")}:${index % 2 === 0 ? "00" : "30"}`,
          duration: { hours: durationHours, minutes: durationMinutes },
          class: index % 3 === 0 ? "VIP" : "Classic",
          price,
          availableSeats: 12 + index,
          amenities: ["Air conditioning", "Charging ports"],
        },
        {
          id: `${routeId}-classic`,
          operatorId: busOperators[(index + 2) % busOperators.length].id,
          departureTime: "10:00",
          arrivalTime: `${String(10 + durationHours).padStart(2, "0")}:30`,
          duration: { hours: durationHours, minutes: durationMinutes },
          class: "Classic",
          price: price - 1000,
          availableSeats: 25 + index,
          amenities: ["Air conditioning"],
        },
      ],
      featured: index % 5 === 0,
    };
  },
);

export const busRoutes: BusRoute[] = [...baseBusRoutes, ...additionalBusRoutes];

export const cities = Array.from(
  new Set(busRoutes.flatMap((route) => [route.origin, route.destination])),
).sort();

busRoutes.forEach((route) => {
  route.departures.forEach((departure, departureIndex) => {
    const operator = busOperators.find(
      (item) => item.id === departure.operatorId,
    );
    departure.originStation ??= `${route.origin} ${operator?.name ?? "Central"} Terminal`;
    departure.destinationStation ??= `${route.destination} ${operator?.name ?? "Main"} Terminal`;
    departure.departureDate ??= `2026-08-${String(departureIndex + 1).padStart(2, "0")}`;
  });
  route.startingPrice = Math.min(
    ...route.departures.map((departure) => departure.price),
  );
  route.formattedStartingPrice = formatPrice(route.startingPrice);
});

export const routes = busRoutes;
export const buses = busOperators;

let nextFoodImage = 0;

const dish = (
  restaurantId: string,
  id: string,
  name: string,
  category: string,
  description: string,
  price: number,
  ingredients: string[],
  dietaryTags: string[] = [],
  spicyLevel: Dish["spicyLevel"] = "Mild",
): Dish => ({
  id,
  restaurantId,
  name,
  category,
  description,
  price,
  currency: "XAF",
  image: foodImages[nextFoodImage++ % foodImages.length],
  ingredients,
  dietaryTags,
  spicyLevel,
  available: true,
  addOns: [
    { name: "Extra plantains", price: 1500 },
    { name: "Side salad", price: 1000 },
  ],
});

const baseRestaurants: Restaurant[] = [
  {
    id: "saveurs-du-mboa",
    slug: "saveurs-du-mboa",
    name: "Saveurs du Mboa",
    description:
      "Atlantic catch and spiced poisson braise served with a modern local touch.",
    tagline: "Modern Cameroonian cuisine by the coast.",
    category: "Local",
    categories: ["Local", "Seafood", "Fine dining"],
    city: "Kribi",
    region: "South",
    address: "Boulevard de la Plage, Kribi",
    rating: 4.9,
    reviewCount: 1248,
    image: restaurantImage[0],
    isOpen: true,
    deliveryMinutes: "20 - 35 min",
    deliveryFee: 1500,
    priceRange: "XAF XAF XAF",
    openingHours: [
      { days: "Mon - Fri", hours: "11:00 - 23:00" },
      { days: "Sat - Sun", hours: "10:00 - 00:00" },
    ],
    phone: "+237 678 123 456",
    email: "hello@saveursdumboa.cm",
    featured: true,
    dishes: [
      dish(
        "saveurs-du-mboa",
        "saveurs-poulet-dg",
        "Poulet DG Signature",
        "Signature",
        "Free-range chicken, ripe plantains, and heritage spices in a rich tomato reduction.",
        12000,
        ["Farm chicken", "Plantain", "Tomato", "Heritage spices"],
      ),
      dish(
        "saveurs-du-mboa",
        "saveurs-poisson-braise",
        "Poisson Braisé",
        "Mains",
        "Whole grilled fish with coastal herbs and a bright pepper sauce.",
        14500,
        ["Fresh fish", "Coastal herbs", "Pepper sauce"],
        [],
        "Medium",
      ),
      dish(
        "saveurs-du-mboa",
        "saveurs-ndole",
        "Ndole and Miondo",
        "Mains",
        "Bitterleaf stew with shrimp, peanuts, and soft cassava rolls.",
        9500,
        ["Bitterleaf", "Shrimp", "Peanuts", "Miondo"],
        ["Gluten-free"],
        "Mild",
      ),
      dish(
        "saveurs-du-mboa",
        "saveurs-calamari",
        "Yassa Spiced Calamari",
        "Starters",
        "Tender calamari with caramelized onions, lemon, and warm yassa spice.",
        4500,
        ["Calamari", "Onion", "Lemon"],
        ["Gluten-free"],
        "Medium",
      ),
    ],
  },
  {
    id: "teranga-bistro",
    slug: "teranga-bistro",
    name: "Teranga Bistro",
    description:
      "A polished Senegalese-Cameroonian fusion kitchen in the heart of Douala.",
    tagline: "West African comfort with a bright, modern plate.",
    category: "Fusion",
    categories: ["Fusion", "Senegalese", "Cameroonian"],
    city: "Douala",
    region: "Littoral",
    address: "Rue 1245, Commercial District, Akwa",
    rating: 4.8,
    reviewCount: 987,
    image: restaurantImage[1],
    isOpen: true,
    deliveryMinutes: "25 - 40 min",
    deliveryFee: 1000,
    priceRange: "XAF XAF XAF",
    openingHours: [
      { days: "Mon - Thu", hours: "12:00 - 22:30" },
      { days: "Fri - Sun", hours: "12:00 - 00:00" },
    ],
    phone: "+237 690 555 214",
    email: "concierge@terangabistro.cm",
    dishes: [
      dish(
        "teranga-bistro",
        "teranga-thieboudienne",
        "Thieboudienne Royale",
        "Mains",
        "Fragrant tomato rice with market fish, vegetables, and tamarind relish.",
        11000,
        ["Market fish", "Tomato rice", "Carrot", "Cabbage"],
      ),
      dish(
        "teranga-bistro",
        "teranga-yassa-chicken",
        "Yassa Chicken",
        "Mains",
        "Charred chicken with lemon-onion sauce and fragrant rice.",
        9000,
        ["Chicken", "Lemon", "Onion", "Rice"],
      ),
      dish(
        "teranga-bistro",
        "teranga-beignet",
        "Beignet Haricot",
        "Starters",
        "Golden bean fritters with a smoky pepper dip.",
        3500,
        ["Beans", "Pepper", "Herbs"],
        ["Vegetarian"],
        "Medium",
      ),
      dish(
        "teranga-bistro",
        "teranga-bissap",
        "Bissap Cooler",
        "Drinks",
        "Hibiscus, pineapple, ginger, and lime served chilled.",
        2000,
        ["Hibiscus", "Pineapple", "Ginger", "Lime"],
        ["Vegan"],
        "None",
      ),
    ],
  },
  {
    id: "la-fourchette-yaounde",
    slug: "la-fourchette-yaounde",
    name: "La Fourchette Yaounde",
    description:
      "French technique meets the ingredients and generosity of the capital.",
    tagline: "Elegant plates, local ingredients.",
    category: "French-Cameroonian",
    categories: ["French", "Local", "Fine dining"],
    city: "Yaounde",
    region: "Central",
    address: "Bastos, Rue 1.782",
    rating: 4.7,
    reviewCount: 746,
    image: restaurantImage[2],
    isOpen: false,
    deliveryMinutes: "30 - 45 min",
    deliveryFee: 1500,
    priceRange: "XAF XAF XAF XAF",
    openingHours: [
      { days: "Tue - Fri", hours: "12:00 - 22:00" },
      { days: "Sat - Sun", hours: "12:00 - 23:00" },
    ],
    phone: "+237 677 441 209",
    email: "reservations@lafourchette.cm",
    featured: true,
    dishes: [
      dish(
        "la-fourchette-yaounde",
        "fourchette-beef",
        "Peppercorn Beef Fillet",
        "Mains",
        "Tender beef with green peppercorn sauce and cassava fondant.",
        18000,
        ["Beef fillet", "Peppercorn", "Cassava"],
      ),
      dish(
        "la-fourchette-yaounde",
        "fourchette-plantain",
        "Plantain Tart",
        "Desserts",
        "Caramelized plantain, cocoa crumble, and vanilla cream.",
        5000,
        ["Plantain", "Cocoa", "Vanilla"],
        ["Vegetarian"],
        "None",
      ),
      dish(
        "la-fourchette-yaounde",
        "fourchette-salad",
        "Market Garden Salad",
        "Starters",
        "Seasonal greens, avocado, herbs, and citrus dressing.",
        4500,
        ["Greens", "Avocado", "Citrus"],
        ["Vegan", "Gluten-free"],
        "None",
      ),
    ],
  },
  {
    id: "mbombo-kitchen",
    slug: "mbombo-kitchen",
    name: "Mbombo Kitchen",
    description:
      "Comforting home-style plates inspired by the forests and rivers of the East.",
    tagline: "Slow food, bold local flavor.",
    category: "Traditional",
    categories: ["Traditional", "Local", "Family-friendly"],
    city: "Bertoua",
    region: "East",
    address: "Avenue de la Republique",
    rating: 4.6,
    reviewCount: 392,
    image: restaurantImage[3],
    isOpen: true,
    deliveryMinutes: "20 - 30 min",
    deliveryFee: 750,
    priceRange: "XAF XAF",
    openingHours: [{ days: "Daily", hours: "10:00 - 22:00" }],
    phone: "+237 695 221 840",
    email: "orders@mbombokitchen.cm",
    dishes: [
      dish(
        "mbombo-kitchen",
        "mbombo-arachide",
        "Chicken in Groundnut Sauce",
        "Mains",
        "Slow-cooked chicken in a silky roasted peanut sauce.",
        8000,
        ["Chicken", "Groundnut", "Tomato"],
        ["Gluten-free"],
        "Mild",
      ),
      dish(
        "mbombo-kitchen",
        "mbombo-fufu",
        "Corn Fufu and Vegetable Stew",
        "Mains",
        "Soft corn fufu with a richly seasoned seasonal vegetable stew.",
        6500,
        ["Corn", "Greens", "Tomato"],
        ["Vegan", "Gluten-free"],
        "Medium",
      ),
      dish(
        "mbombo-kitchen",
        "mbombo-suya",
        "Smoky Beef Suya",
        "Starters",
        "Charcoal-grilled beef skewers with suya spice and onions.",
        5500,
        ["Beef", "Suya spice", "Onion"],
        [],
        "Hot",
      ),
    ],
  },
  {
    id: "sahel-spice-house",
    slug: "sahel-spice-house",
    name: "Sahel Spice House",
    description:
      "Northern specialties, fragrant grains, and cool drinks in a shaded courtyard.",
    tagline: "The flavors of the north, thoughtfully served.",
    category: "Northern",
    categories: ["Northern", "Local", "Halal"],
    city: "Garoua",
    region: "North",
    address: "Maroua Road, Garoua",
    rating: 4.5,
    reviewCount: 218,
    image: restaurantImage[4],
    isOpen: true,
    deliveryMinutes: "15 - 25 min",
    deliveryFee: 500,
    priceRange: "XAF XAF",
    openingHours: [{ days: "Daily", hours: "09:00 - 21:30" }],
    phone: "+237 681 902 117",
    email: "hello@sahelspice.cm",
    dishes: [
      dish(
        "sahel-spice-house",
        "sahel-lamb",
        "Spiced Lamb Couscous",
        "Mains",
        "Steamed couscous with tender lamb, chickpeas, and roasted vegetables.",
        9000,
        ["Lamb", "Couscous", "Chickpeas", "Vegetables"],
      ),
      dish(
        "sahel-spice-house",
        "sahel-millet",
        "Millet Porridge",
        "Breakfast",
        "Warm millet porridge with dates, peanuts, and a touch of honey.",
        3000,
        ["Millet", "Dates", "Peanuts", "Honey"],
        ["Vegetarian"],
        "None",
      ),
      dish(
        "sahel-spice-house",
        "sahel-grilled",
        "Grilled River Fish",
        "Mains",
        "River fish grilled over charcoal with fresh herbs and lemon.",
        8500,
        ["River fish", "Herbs", "Lemon"],
        ["Gluten-free"],
        "Medium",
      ),
    ],
  },
  {
    id: "green-leaf-bistro",
    slug: "green-leaf-bistro",
    name: "Green Leaf Bistro",
    description:
      "A bright, plant-forward kitchen serving fresh bowls and Cameroonian classics.",
    tagline: "Fresh food for slow afternoons.",
    category: "Healthy",
    categories: ["Healthy", "Vegetarian", "Local"],
    city: "Buea",
    region: "South West",
    address: "Molyko Main Street, Buea",
    rating: 4.7,
    reviewCount: 331,
    image: restaurantImage[5],
    isOpen: true,
    deliveryMinutes: "15 - 25 min",
    deliveryFee: 750,
    priceRange: "XAF XAF",
    openingHours: [
      { days: "Mon - Sat", hours: "08:00 - 21:00" },
      { days: "Sun", hours: "10:00 - 18:00" },
    ],
    phone: "+237 699 310 440",
    email: "hello@greenleafbistro.cm",
    featured: true,
    dishes: [
      dish(
        "green-leaf-bistro",
        "green-leaf-buddha-bowl",
        "Mango Peanut Buddha Bowl",
        "Bowls",
        "Roasted vegetables, mango, greens, rice, and peanut-lime dressing.",
        6500,
        ["Mango", "Rice", "Greens", "Peanuts"],
        ["Vegan", "Gluten-free"],
        "Mild",
      ),
      dish(
        "green-leaf-bistro",
        "green-leaf-avocado-toast",
        "Avocado and Egg Toast",
        "Breakfast",
        "Sourdough toast with avocado, poached egg, herbs, and tomato relish.",
        5000,
        ["Avocado", "Egg", "Sourdough", "Tomato"],
        ["Vegetarian"],
        "None",
      ),
      dish(
        "green-leaf-bistro",
        "green-leaf-plantain",
        "Plantain and Bean Salad",
        "Salads",
        "Sweet plantain, black beans, greens, and a citrus dressing.",
        5500,
        ["Plantain", "Beans", "Greens", "Citrus"],
        ["Vegan", "Gluten-free"],
        "Mild",
      ),
      dish(
        "green-leaf-bistro",
        "green-leaf-ginger",
        "Pineapple Ginger Juice",
        "Drinks",
        "Fresh pineapple juice with ginger and mint.",
        2000,
        ["Pineapple", "Ginger", "Mint"],
        ["Vegan", "Gluten-free"],
        "None",
      ),
    ],
  },
  {
    id: "la-marina-seafood",
    slug: "la-marina-seafood",
    name: "La Marina Seafood",
    description:
      "A lively Douala seafood counter bringing the day's catch straight to the table.",
    tagline: "The coast, served generously.",
    category: "Seafood",
    categories: ["Seafood", "Local", "Family-friendly"],
    city: "Douala",
    region: "Littoral",
    address: "Bonapriso Waterfront, Douala",
    rating: 4.6,
    reviewCount: 584,
    image: restaurantImage[0],
    isOpen: false,
    deliveryMinutes: "25 - 40 min",
    deliveryFee: 1250,
    priceRange: "XAF XAF XAF",
    openingHours: [{ days: "Tue - Sun", hours: "11:00 - 23:00" }],
    phone: "+237 677 800 124",
    email: "reservations@lamarinaseafood.cm",
    dishes: [
      dish(
        "la-marina-seafood",
        "marina-prawns",
        "Garlic Prawns",
        "Starters",
        "Pan-seared prawns with garlic butter, herbs, and grilled lime.",
        10500,
        ["Prawns", "Garlic", "Butter", "Lime"],
        ["Gluten-free"],
        "Medium",
      ),
      dish(
        "la-marina-seafood",
        "marina-coconut-fish",
        "Coconut Fish Curry",
        "Mains",
        "Tender fish in a fragrant coconut curry with steamed rice.",
        12000,
        ["White fish", "Coconut", "Curry spices", "Rice"],
        ["Gluten-free"],
        "Medium",
      ),
      dish(
        "la-marina-seafood",
        "marina-crab",
        "Crab Pepper Soup",
        "Soups",
        "A warming crab broth with herbs, tomato, and fresh pepper.",
        8500,
        ["Crab", "Tomato", "Herbs", "Pepper"],
        ["Gluten-free"],
        "Hot",
      ),
      dish(
        "la-marina-seafood",
        "marina-coconut-tart",
        "Coconut Lime Tart",
        "Desserts",
        "A crisp coconut crust with lime curd and toasted coconut.",
        4500,
        ["Coconut", "Lime", "Wheat", "Sugar"],
        ["Vegetarian"],
        "None",
      ),
    ],
  },
];

const additionalRestaurantNames = [
  ["Mboa Grill House", "Douala", "Littoral", "Grill"],
  ["Bastos Table", "Yaounde", "Central", "Contemporary"],
  ["Buea Beanery", "Buea", "South West", "Cafe"],
  ["Kribi Catch", "Kribi", "South", "Seafood"],
  ["West Spice Kitchen", "Bafoussam", "West", "Traditional"],
  ["Bamenda Hearth", "Bamenda", "North West", "Local"],
  ["Garoua Grill", "Garoua", "North", "Halal"],
  ["Ebolowa Green Table", "Ebolowa", "South", "Healthy"],
  ["Foumban Heritage Kitchen", "Foumban", "West", "Heritage"],
  ["Limbe Sunset Kitchen", "Limbe", "South West", "Seafood"],
  ["Wouri Bowl Co", "Douala", "Littoral", "Bowls"],
  ["Mfoundi Lunch Room", "Yaounde", "Central", "Local"],
  ["Sahel Courtyard", "Maroua", "Far North", "Northern"],
] as const;

const additionalRestaurants: Restaurant[] = additionalRestaurantNames.map(
  ([name, city, region, category], index) => {
    const id = name.toLowerCase().replaceAll(" ", "-");
    return {
      id,
      slug: id,
      name,
      description: `A welcoming ${category.toLowerCase()} kitchen serving the flavors of ${region}.`,
      tagline: `Fresh plates and easy hospitality in ${city}.`,
      category,
      categories: [category, "Local", "Family-friendly"],
      city,
      region,
      address: `Market District, ${city}`,
      rating: Number((4.2 + (index % 7) / 10).toFixed(1)),
      reviewCount: 145 + index * 29,
      image: restaurantImage[index % restaurantImage.length],
      isOpen: index % 4 !== 3,
      deliveryMinutes: `${15 + (index % 3) * 5} - ${30 + (index % 3) * 5} min`,
      deliveryFee: 500 + (index % 4) * 250,
      priceRange: index % 3 === 0 ? "XAF XAF XAF" : "XAF XAF",
      openingHours: [{ days: "Daily", hours: "10:00 - 22:00" }],
      phone: `+237 67${String(1000000 + index * 731).slice(0, 7)}`,
      email: `hello@${id}.cm`,
      dishes: [
        dish(
          id,
          `${id}-signature`,
          `${name} Signature Plate`,
          "Mains",
          `The house specialty with seasonal ingredients and a bright local sauce.`,
          6500 + index * 350,
          ["Seasonal produce", "Local herbs", "Rice"],
        ),
        dish(
          id,
          `${id}-starter`,
          "Spiced Plantain Bites",
          "Starters",
          "Crisp plantain with a house pepper dip.",
          3000 + index * 100,
          ["Plantain", "Pepper", "Herbs"],
          ["Vegetarian"],
          "Medium",
        ),
        dish(
          id,
          `${id}-cooler`,
          "Pineapple Ginger Cooler",
          "Drinks",
          "Fresh pineapple, ginger, lime, and mint served chilled.",
          1800,
          ["Pineapple", "Ginger", "Lime"],
          ["Vegan", "Gluten-free"],
          "None",
        ),
      ],
      featured: index % 4 === 0,
    };
  },
);

export const restaurants: Restaurant[] = [
  ...baseRestaurants,
  ...additionalRestaurants,
];

// Keep numeric prices available for sorting and calculations while exposing
// comma-separated values for cards and detail views.
hotels.forEach((hotel) => {
  hotel.formattedStartingPrice = formatPrice(hotel.startingPrice);
  hotel.rooms.forEach((room) => {
    room.formattedPrice = formatPrice(room.price);
  });
});

busRoutes.forEach((route) => {
  route.departures.forEach((departure) => {
    departure.formattedPrice = formatPrice(departure.price);
  });
});

restaurants.forEach((restaurant) => {
  restaurant.formattedDeliveryFee = formatPrice(restaurant.deliveryFee);
  restaurant.dishes.forEach((menuItem) => {
    menuItem.formattedPrice = formatPrice(menuItem.price);
  });
});

export const featuredHotels = hotels.filter((hotel) => hotel.featured);
export const featuredBusOperators = busOperators.filter(
  (operator) => operator.featured,
);
export const featuredRoutes = busRoutes.filter((route) => route.featured);
export const featuredRestaurants = restaurants.filter(
  (restaurant) => restaurant.featured,
);

export const restaurantCategories = Array.from(
  new Set(restaurants.flatMap((restaurant) => restaurant.categories)),
);

export const dishes = restaurants.flatMap((restaurant) => restaurant.dishes);

export const cameroonCities = [
  "Yaoundé",
  "Douala",
  "Bamenda",
  "Bafoussam",
  "Garoua",
  "Maroua",
  "Ngaoundéré",
  "Bertoua",
  "Ebolowa",
  "Buea",
  "Limbe",
  "Kumba",
  "Kribi",
  "Edéa",
  "Nkongsamba",
  "Mbalmayo",
  "Dschang",
  "Foumban",
  "Mbouda",
  "Kumbo",
  "Wum",
  "Fundong",
  "Tiko",
  "Mamfe",
  "Guider",
  "Kousséri",
  "Mokolo",
  "Meiganga",
  "Abong-Mbang",
  "Sangmélima",
  "Obala",
  "Akonolinga",
];
