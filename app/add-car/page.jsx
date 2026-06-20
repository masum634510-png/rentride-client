"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCar } from "react-icons/fa";
import PrivateRoute from "../../components/PrivateRoute";

const CAR_TYPES = ["SUV", "Sedan", "Hatchback", "Luxury", "Electric", "Pickup", "Van", "Convertible"];

export default function AddCar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    carName: "", dailyRentPrice: "", carType: "SUV",
    imageUrl: "", seatCapacity: "", pickupLocation: "",
    description: "", availability: "Available",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/cars`, { ...form, dailyRentPrice: Number(form.dailyRentPrice), seatCapacity: Number(form.seatCapacity) }, { withCredentials: true });
      toast.success("Car listed successfully! 🚗");
      router.push("/my-added-cars");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add car!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="pt-28 pb-20 min-h-screen">
        <div className="container-custom">
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-8 md:p-10 max-w-3xl mx-auto shadow-[var(--shadow-custom)]">
            <div className="text-center mb-8">
              <FaCar className="text-4xl text-[var(--color-primary)] mx-auto mb-3" />
              <h1 className="text-2xl md:text-3xl font-outfit font-bold text-[var(--color-text-primary)] mb-1">Add New Car</h1>
              <p className="text-[var(--color-text-muted)] text-sm">List your vehicle on RentRide</p>
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-group">
                <label className="form-label">Car Name *</label>
                <input type="text" name="carName" className="form-input" placeholder="e.g. Toyota Camry 2023" value={form.carName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Daily Rent Price ($) *</label>
                <input type="number" name="dailyRentPrice" className="form-input" placeholder="e.g. 75" min="1" value={form.dailyRentPrice} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Car Type *</label>
                <select name="carType" className="form-input [&>option]:bg-[var(--color-bg-card)]" value={form.carType} onChange={handleChange}>
                  {CAR_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Seat Capacity *</label>
                <input type="number" name="seatCapacity" className="form-input" placeholder="e.g. 5" min="1" max="20" value={form.seatCapacity} onChange={handleChange} required />
              </div>
              <div className="form-group md:col-span-2">
                <label className="form-label">Image URL *</label>
                <input type="url" name="imageUrl" className="form-input" placeholder="https://i.ibb.co/your-image.jpg" value={form.imageUrl} onChange={handleChange} required />
              </div>
              <div className="form-group md:col-span-2">
                <label className="form-label">Pickup Location *</label>
                <input type="text" name="pickupLocation" className="form-input" placeholder="e.g. Dhaka Airport, Terminal 1" value={form.pickupLocation} onChange={handleChange} required />
              </div>
              <div className="form-group md:col-span-2">
                <label className="form-label">Description *</label>
                <textarea name="description" className="form-input min-h-[100px] resize-y" placeholder="Describe the car features, condition, rules..." value={form.description} onChange={handleChange} required rows={4} />
              </div>
              <div className="form-group md:col-span-2">
                <label className="form-label">Availability *</label>
                <select name="availability" className="form-input [&>option]:bg-[var(--color-bg-card)]" value={form.availability} onChange={handleChange}>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
              <div className="md:col-span-2 mt-2">
                <button type="submit" className="btn btn-primary btn-lg w-full justify-center" disabled={loading}>
                  {loading ? "Adding Car..." : "Add Car to Fleet 🚗"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
