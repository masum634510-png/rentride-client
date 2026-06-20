"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { FaEdit } from "react-icons/fa";
import PrivateRoute from "../../../components/PrivateRoute";

const CAR_TYPES = ["SUV", "Sedan", "Hatchback", "Luxury", "Electric", "Pickup", "Van", "Convertible"];

export default function UpdateCar() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    carName: "", dailyRentPrice: "", carType: "SUV",
    imageUrl: "", seatCapacity: "", pickupLocation: "",
    description: "", availability: "Available",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!id) return;
    axios.get(`${API_URL}/cars/${id}`).then((res) => {
      const { carName, dailyRentPrice, carType, imageUrl, seatCapacity, pickupLocation, description, availability } = res.data;
      setForm({ carName, dailyRentPrice, carType, imageUrl, seatCapacity, pickupLocation, description, availability });
      setLoading(false);
    }).catch(() => { toast.error("Failed to load car data"); setLoading(false); });
  }, [id, API_URL]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`${API_URL}/cars/${id}`, { ...form, dailyRentPrice: Number(form.dailyRentPrice), seatCapacity: Number(form.seatCapacity) }, { withCredentials: true });
      toast.success("Car updated successfully!");
      router.push("/my-added-cars");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute>
      <div className="pt-28 pb-20 min-h-screen">
        <div className="container-custom">
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-8 md:p-10 max-w-3xl mx-auto shadow-[var(--shadow-custom)]">
            <div className="text-center mb-8">
              <FaEdit className="text-4xl text-[var(--color-primary)] mx-auto mb-3" />
              <h1 className="text-2xl md:text-3xl font-outfit font-bold text-[var(--color-text-primary)] mb-1">Update Car</h1>
              <p className="text-[var(--color-text-muted)] text-sm">Edit your car listing details</p>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-group">
                <label className="form-label">Car Name *</label>
                <input type="text" name="carName" className="form-input" value={form.carName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Daily Rent Price ($) *</label>
                <input type="number" name="dailyRentPrice" className="form-input" min="1" value={form.dailyRentPrice} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Car Type *</label>
                <select name="carType" className="form-input [&>option]:bg-[var(--color-bg-card)]" value={form.carType} onChange={handleChange}>
                  {CAR_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Seat Capacity *</label>
                <input type="number" name="seatCapacity" className="form-input" min="1" value={form.seatCapacity} onChange={handleChange} required />
              </div>
              <div className="form-group md:col-span-2">
                <label className="form-label">Image URL *</label>
                <input type="url" name="imageUrl" className="form-input" value={form.imageUrl} onChange={handleChange} required />
              </div>
              <div className="form-group md:col-span-2">
                <label className="form-label">Pickup Location *</label>
                <input type="text" name="pickupLocation" className="form-input" value={form.pickupLocation} onChange={handleChange} required />
              </div>
              <div className="form-group md:col-span-2">
                <label className="form-label">Description *</label>
                <textarea name="description" className="form-input min-h-[100px] resize-y" value={form.description} onChange={handleChange} required rows={4} />
              </div>
              <div className="form-group md:col-span-2">
                <label className="form-label">Availability *</label>
                <select name="availability" className="form-input [&>option]:bg-[var(--color-bg-card)]" value={form.availability} onChange={handleChange}>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
              <div className="md:col-span-2 flex gap-4 mt-2">
                <button type="button" className="btn btn-outline flex-1 justify-center" onClick={()=>router.push("/my-added-cars")}>Cancel</button>
                <button type="submit" className="btn btn-primary flex-[2] justify-center" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
