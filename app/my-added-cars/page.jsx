"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FaEdit, FaTrash, FaTimes, FaPlus, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import PrivateRoute from "../../components/PrivateRoute";

export default function MyAddedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(null);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchCars = () => {
    setLoading(true);
    axios.get(`${API_URL}/my-cars`, { withCredentials: true })
      .then((res) => { setCars(res.data); setLoading(false); })
      .catch(() => { toast.error("Failed to load cars"); setLoading(false); });
  };

  useEffect(() => { fetchCars(); }, [API_URL]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/cars/${deleteModal}`, { withCredentials: true });
      toast.success("Car deleted successfully!");
      setCars((prev) => prev.filter((c) => c._id !== deleteModal));
      setDeleteModal(null);
    } catch {
      toast.error("Failed to delete car!");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute>
      <div className="pt-20 min-h-screen">
        <div className="bg-[linear-gradient(135deg,rgba(99,102,241,0.1)_0%,rgba(139,92,246,0.05)_100%)] border-b border-[var(--color-border)] py-12">
          <div className="container-custom">
            <h1 className="text-3xl font-outfit font-bold text-[var(--color-text-primary)] mb-1">My Added Cars</h1>
            <p className="text-[var(--color-text-secondary)] text-sm">Manage your car listings</p>
          </div>
        </div>

        <div className="container-custom py-10 pb-16">
          <div className="flex justify-end mb-6">
            <Link href="/add-car" className="btn btn-primary btn-sm"><FaPlus /> Add New Car</Link>
          </div>

          {cars.length === 0 ? (
            <div className="text-center py-16 px-4 border border-dashed border-[var(--color-border)] rounded-2xl">
              <div className="text-5xl mb-4 opacity-40">🚗</div>
              <h3 className="text-xl text-[var(--color-text-primary)] mb-2">No cars listed yet</h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-6">Start listing your vehicles to earn on RentRide</p>
              <Link href="/add-car" className="btn btn-primary">List Your First Car</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div key={car._id} className="card flex flex-col group">
                  <div className="relative h-[180px] overflow-hidden">
                    <img src={car.imageUrl} alt={car.carName} onError={(e)=>{e.target.src="https://via.placeholder.com/300x180?text=No+Image"}} className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent via-transparent" />
                    <span className={`absolute top-2 right-2 badge ${car.availability==="Available"?"badge-success":"badge-danger"} text-[11px]`}>{car.availability}</span>
                  </div>
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h3 className="font-bold text-[var(--color-text-primary)] text-base mb-1 truncate">{car.carName}</h3>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          <span className="flex items-center gap-1 text-[12px] text-[var(--color-text-muted)]"><FaUsers className="text-[var(--color-primary-light)]" />{car.seatCapacity} Seats</span>
                          <span className="flex items-center gap-1 text-[12px] text-[var(--color-text-muted)]"><FaMapMarkerAlt className="text-[var(--color-primary-light)]" />{car.pickupLocation}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg font-extrabold bg-gradient-to-br from-indigo-500 to-purple-400 bg-clip-text text-transparent">${car.dailyRentPrice}<span className="text-[10px] text-[var(--color-text-muted)] ml-0.5" style={{WebkitTextFillColor:"var(--color-text-muted)"}}>/day</span></div>
                        <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{car.bookingCount||0} total bookings</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 p-4 pt-0">
                    <button className="btn btn-outline btn-sm flex-1 justify-center" onClick={()=>router.push(`/update-car/${car._id}`)}>
                      <FaEdit /> Update
                    </button>
                    <button className="btn btn-danger btn-sm flex-1 justify-center" onClick={()=>setDeleteModal(car._id)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Modal */}
        {deleteModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={(e)=>{ if(e.target===e.currentTarget) setDeleteModal(null); }}>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 max-w-[380px] w-full relative animate-in zoom-in-95 duration-200 text-center shadow-2xl">
              <button className="absolute top-3 right-3 bg-white/5 border-none text-[var(--color-text-secondary)] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-red-500 hover:text-white" onClick={()=>setDeleteModal(null)}><FaTimes /></button>
              <div className="text-5xl mb-4">🗑️</div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Delete Car?</h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-6">This action cannot be undone. The car will be permanently removed.</p>
              <div className="flex gap-3">
                <button className="btn btn-outline flex-1 justify-center" onClick={()=>setDeleteModal(null)}>Cancel</button>
                <button className="btn btn-danger flex-1 justify-center" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
