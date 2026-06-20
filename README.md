# 🚗 RentRide — Premium Car Rental Platform

**Live Site URL:** [https://client-ivory-xi.vercel.app](https://client-ivory-xi.vercel.app)

RentRide is a full-stack car rental platform where users can explore available cars, view car details, rent vehicles, manage their bookings, and maintain their profiles. Built with Next.js, Node.js, MongoDB, and Firebase Authentication.

---

## ✨ Key Features

- 🔐 **Secure Authentication** — Firebase-powered login and registration with Google OAuth support. JWT tokens are stored in HTTPOnly cookies to protect private APIs and ensure secure sessions.

- 🚘 **Full Car Management (CRUD)** — Logged-in users can add, update, and delete their own car listings with fields like car name, type, daily rent price, seat capacity, pickup location, and availability status.

- 📅 **Booking System** — Users can book any available car, specify driver preferences, add special notes, and view all their bookings in a personalized "My Bookings" dashboard with total price and booking date.

- 🔍 **Search & Filter** — Explore Cars page supports real-time search by car name (MongoDB `$regex`) and filter by car type (SUV, Sedan, Hatchback, Luxury, Electric), making it easy to find the perfect ride.

- 📱 **Fully Responsive & Modern UI** — Built with Tailwind CSS v4 and Framer Motion, the interface is fully responsive across mobile, tablet, and desktop. Features include dark mode, glassmorphism cards, smooth animations, and a recruiter-friendly design.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, Tailwind CSS v4 |
| Animation | Framer Motion |
| Auth | Firebase Authentication, JWT (HTTPOnly Cookie) |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Hosting | Vercel (Client), Render (Server) |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Firebase project

### Client Setup
```bash
git clone https://github.com/masum634510-png/rentride-client-
cd rentride-client
npm install
npm run dev
```

Create a `.env.local` file:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

```
rentride-client/
├── app/                  # Next.js App Router pages
│   ├── page.jsx          # Home page
│   ├── explore-cars/     # All cars listing
│   ├── cars/[id]/        # Car details + booking
│   ├── add-car/          # Add car form (private)
│   ├── my-bookings/      # User bookings (private)
│   ├── my-added-cars/    # User's listed cars (private)
│   └── update-car/       # Update car form (private)
├── components/           # Navbar, Footer, CarCard, etc.
├── context/              # Auth context (Firebase)
└── lib/                  # Axios instance, helpers
```

---

## 🔗 Related Repository

- **Server Side:** [rentride-server](https://github.com/masum634510-png/rentride-server)
