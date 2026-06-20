"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { FaUsers, FaMapMarkerAlt, FaStar, FaCar, FaCalendarAlt, FaTimes } from "react-icons/fa";

export default function CarDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [booking, setBooking] = useState({ driverNeeded: "No", specialNote: "" });
  const [bookLoading, setBookLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!id) return;
    axios.get(`${API_URL}/cars/${id}`).then((res) => { setCar(res.data); setLoading(false); }).catch(() => setLoading(false));
  }, [id, API_URL]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) { toast.error("Please login to book!"); router.push("/login"); return; }
    setBookLoading(true);
    try {
      const days = 1;
      const totalPrice = car.dailyRentPrice * days;
      await axios.post(`${API_URL}/bookings`, {
        carId: car._id, carName: car.carName, carImage: car.imageUrl,
        dailyRentPrice: car.dailyRentPrice, totalPrice,
        pickupLocation: car.pickupLocation, carType: car.carType,
        driverNeeded: booking.driverNeeded, specialNote: booking.specialNote,
      }, { withCredentials: true });
      toast.success("Car booked successfully! 🎉");
      setModalOpen(false);
      setCar((prev) => ({ ...prev, availability: "Unavailable", bookingCount: (prev.bookingCount || 0) + 1 }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed!");
    } finally {
      setBookLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!car) return <div className="text-center py-32"><div className="text-6xl mb-4 opacity-40">🚗</div><h3 className="text-xl text-[var(--color-text-secondary)] mb-4">Car not found</h3><Link href="/explore-cars" className="btn btn-primary">Back to Cars</Link></div>;

  const isAvailable = car.availability === "Available";

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div>
            <div className="rounded-2xl overflow-hidden relative h-[380px] shadow-lg">
              <img src={car.imageUrl} alt={car.carName} onError={(e)=>{e.target.src="https://via.placeholder.com/600x400?text=No+Image"}} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent via-transparent" />
            </div>
            <div className="flex gap-2 flex-wrap mt-4">
              <span className={`badge ${isAvailable ? "badge-success" : "badge-danger"}`}>{car.availability}</span>
              <span className="badge badge-primary">{car.carType}</span>
              <span className="badge badge-accent">{car.bookingCount || 0} Bookings</span>
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-outfit font-bold text-[var(--color-text-primary)] mb-3">{car.carName}</h1>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent">${car.dailyRentPrice}</span>
              <span className="text-base text-[var(--color-text-muted)]">/ day</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2.5 bg-indigo-500/10 border border-[var(--color-border)] px-4 py-3 rounded-xl text-[var(--color-text-secondary)] text-sm"><FaUsers className="text-[var(--color-primary-light)] shrink-0" /><span>{car.seatCapacity} Seats</span></div>
              <div className="flex items-center gap-2.5 bg-indigo-500/10 border border-[var(--color-border)] px-4 py-3 rounded-xl text-[var(--color-text-secondary)] text-sm"><FaMapMarkerAlt className="text-[var(--color-primary-light)] shrink-0" /><span>{car.pickupLocation}</span></div>
              <div className="flex items-center gap-2.5 bg-indigo-500/10 border border-[var(--color-border)] px-4 py-3 rounded-xl text-[var(--color-text-secondary)] text-sm"><FaCar className="text-[var(--color-primary-light)] shrink-0" /><span>{car.carType}</span></div>
              <div className="flex items-center gap-2.5 bg-indigo-500/10 border border-[var(--color-border)] px-4 py-3 rounded-xl text-[var(--color-text-secondary)] text-sm"><FaCalendarAlt className="text-[var(--color-primary-light)] shrink-0" /><span>{new Date(car.createdAt).toLocaleDateString()}</span></div>
            </div>

            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 mb-5 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Description</h3>
              <p className="text-[var(--color-text-secondary)] text-[15px] leading-relaxed">{car.description}</p>
            </div>

            <div className="mb-5">
              <p className="text-xs text-[var(--color-text-muted)]">Listed by</p>
              <p className="text-sm font-medium text-[var(--color-primary-light)]">{car.ownerEmail}</p>
            </div>

            <button
              className="btn btn-primary btn-lg w-full justify-center transition-all duration-300"
              onClick={() => { if (!user) { toast.error("Please login first!"); router.push("/login"); return; } setModalOpen(true); }}
              disabled={!isAvailable}
              style={{ opacity: isAvailable ? 1 : 0.5, cursor: isAvailable ? "pointer" : "not-allowed" }}
            >
              {isAvailable ? "Book Now" : "Currently Unavailable"}
            </button>

            <div className="text-center mt-4">
              <Link href="/explore-cars" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors">← Back to Explore</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={(e)=>{ if(e.target===e.currentTarget) setModalOpen(false); }}>
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-8 max-w-[480px] w-full relative animate-in zoom-in-95 duration-200 shadow-2xl">
            <button className="absolute top-4 right-4 bg-white/5 border-none text-[var(--color-text-secondary)] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-red-500 hover:text-white" onClick={()=>setModalOpen(false)}><FaTimes /></button>
            <h2 className="text-xl font-bold mb-2">Book {car.carName}</h2>
            <p className="text-[var(--color-text-muted)] text-sm mb-6">Daily Rate: <strong className="text-[var(--color-primary-light)]">${car.dailyRentPrice}/day</strong></p>
            
            <form onSubmit={handleBook} className="flex flex-col gap-4">
              <div className="form-group">
                <label className="form-label">Driver Needed?</label>
                <select className="form-input [&>option]:bg-[var(--color-bg-card)]" value={booking.driverNeeded} onChange={(e)=>setBooking({...booking,driverNeeded:e.target.value})}>
                  <option value="No">No — I'll drive myself</option>
                  <option value="Yes">Yes — I need a driver</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Special Note (Optional)</label>
                <textarea className="form-input min-h-[100px] resize-y" placeholder="Any special requests or notes..." value={booking.specialNote} onChange={(e)=>setBooking({...booking,specialNote:e.target.value})} />
              </div>
              <div className="flex justify-between items-center bg-indigo-500/10 border border-[var(--color-border)] p-3 rounded-lg text-sm text-[var(--color-text-secondary)] mt-2">
                <span>Pickup Location</span><span className="font-medium">{car.pickupLocation}</span>
              </div>
              <button type="submit" className="btn btn-primary w-full justify-center mt-2" disabled={bookLoading}>
                {bookLoading ? "Processing..." : "Confirm Booking 🚗"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
