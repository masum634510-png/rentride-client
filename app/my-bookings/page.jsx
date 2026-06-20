"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FaCar, FaTimes, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function MyBookings() {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModal, setCancelModal] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchBookings = () => {
    setLoading(true);
    axios.get(`${API_URL}/bookings`, { withCredentials: true })
      .then((res) => { setBookings(res.data); setLoading(false); })
      .catch(() => { toast.error("Failed to load bookings"); setLoading(false); });
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchBookings();
    }
  }, [authLoading, user, API_URL]);

  const handleCancel = async () => {
    try {
      await axios.delete(`${API_URL}/bookings/${cancelModal}`, { withCredentials: true });
      toast.success("Booking cancelled!");
      setBookings((prev) => prev.filter((b) => b._id !== cancelModal));
      setCancelModal(null);
    } catch {
      toast.error("Failed to cancel booking!");
    }
  };

  return (
    <PrivateRoute>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center pt-20">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="pt-20 min-h-screen">
        <div className="bg-[linear-gradient(135deg,rgba(99,102,241,0.1)_0%,rgba(139,92,246,0.05)_100%)] border-b border-[var(--color-border)] py-12">
          <div className="container-custom">
            <h1 className="text-3xl font-outfit font-bold text-[var(--color-text-primary)] mb-1">My Bookings</h1>
            <p className="text-[var(--color-text-secondary)] text-sm">Track and manage your car reservations</p>
          </div>
        </div>

        <div className="container-custom py-10 pb-16">
          {bookings.length === 0 ? (
            <div className="text-center py-16 px-4 border border-dashed border-[var(--color-border)] rounded-2xl">
              <div className="text-5xl mb-4 opacity-40">📋</div>
              <h3 className="text-xl text-[var(--color-text-primary)] mb-2">No bookings yet</h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-6">Start exploring our fleet and book your first car!</p>
              <Link href="/explore-cars" className="btn btn-primary">Explore Cars</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {bookings.map((booking) => (
                <div key={booking._id} className="card p-0 overflow-hidden group hover:border-indigo-500/40">
                  <div className="flex flex-col md:flex-row md:items-stretch">
                    <div className="relative md:w-[180px] h-[160px] md:h-auto overflow-hidden shrink-0">
                      <img src={booking.carImage} alt={booking.carName} onError={(e) => { e.target.src = "https://via.placeholder.com/140x120?text=Car"; }} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent via-transparent md:hidden" />
                    </div>
                    <div className="p-5 flex-1 border-t md:border-t-0 md:border-l border-[var(--color-border)] flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{booking.carName}</h3>
                        <span className={`badge ${booking.status === "Confirmed" ? "badge-success" : "badge-danger"} text-[10px]`}>{booking.status}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-[13px] text-[var(--color-text-muted)]">
                          <FaCalendarAlt className="text-[var(--color-primary-light)]" />
                          {format(new Date(booking.bookingDate), "dd MMM yyyy, hh:mm a")}
                        </span>
                        <span className="flex items-center gap-1.5 text-[13px] text-[var(--color-text-muted)]">
                          <FaMapMarkerAlt className="text-[var(--color-primary-light)]" />{booking.pickupLocation}
                        </span>
                        <span className="flex items-center gap-1.5 text-[13px] text-[var(--color-text-muted)]">
                          <FaCar className="text-[var(--color-primary-light)]" />{booking.carType}
                        </span>
                      </div>
                      {booking.specialNote && (
                        <p className="mt-3 text-xs text-[var(--color-text-muted)] italic bg-white/5 p-2 rounded-lg border border-[var(--color-border)]">
                          <span className="font-semibold not-italic text-[var(--color-text-secondary)] mr-1">Note:</span> {booking.specialNote}
                        </p>
                      )}
                    </div>
                    <div className="p-5 bg-black/10 border-t md:border-t-0 md:border-l border-[var(--color-border)] flex flex-row md:flex-col items-center md:items-end justify-between md:min-w-[160px]">
                      <div className="text-left md:text-right">
                        <p className="text-xs text-[var(--color-text-muted)] mb-0.5">Total Price</p>
                        <p className="text-2xl font-extrabold bg-gradient-to-br from-indigo-500 to-purple-400 bg-clip-text text-transparent">${booking.totalPrice}</p>
                        <p className="text-[11px] text-[var(--color-text-muted)] mt-1">Driver: <span className="font-medium text-[var(--color-text-secondary)]">{booking.driverNeeded}</span></p>
                      </div>
                      <button className="btn btn-danger btn-sm" onClick={() => setCancelModal(booking._id)}>
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cancelModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={(e) => { if (e.target === e.currentTarget) setCancelModal(null); }}>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 max-w-[380px] w-full relative animate-in zoom-in-95 duration-200 text-center shadow-2xl">
              <button className="absolute top-3 right-3 bg-white/5 border-none text-[var(--color-text-secondary)] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-red-500 hover:text-white" onClick={() => setCancelModal(null)}><FaTimes /></button>
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Cancel Booking?</h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-6">Are you sure? The car will be made available again.</p>
              <div className="flex gap-3">
                <button className="btn btn-outline flex-1 justify-center" onClick={() => setCancelModal(null)}>Keep It</button>
                <button className="btn btn-danger flex-1 justify-center" onClick={handleCancel}>Yes, Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      )}
    </PrivateRoute>
  );
}
