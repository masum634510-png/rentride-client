"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaCar, FaGoogle, FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";

export default function Register() {
  const { register, googleLogin, updateUserProfile } = useAuth();
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [passErrors, setPassErrors] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const validatePassword = (pass) => {
    const errors = [];
    if (!/[A-Z]/.test(pass)) errors.push("Must have an uppercase letter");
    if (!/[a-z]/.test(pass)) errors.push("Must have a lowercase letter");
    if (pass.length < 6) errors.push("At least 6 characters required");
    return errors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "password") setPassErrors(validatePassword(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validatePassword(form.password);
    if (errors.length > 0) { setPassErrors(errors); return; }
    setLoading(true);
    try {
      const result = await register(form.email, form.password);
      await updateUserProfile(form.name, form.photoURL);
      await axios.post(`${API_URL}/users`, { name: form.name, email: form.email, photoURL: form.photoURL });
      toast.success("Account created successfully!");
      router.push("/login");
    } catch (err) {
      toast.error(err.message.includes("email-already-in-use") ? "Email already registered!" : "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await googleLogin();
      await axios.post(`${API_URL}/users`, { name: result.user.displayName, email: result.user.email, photoURL: result.user.photoURL });
      toast.success("Logged in with Google! 🚗");
      router.push("/");
    } catch { toast.error("Google login failed!"); }
  };

  const rules = [
    { label: "Uppercase letter", test: /[A-Z]/.test(form.password) },
    { label: "Lowercase letter", test: /[a-z]/.test(form.password) },
    { label: "At least 6 characters", test: form.password.length >= 6 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
      <div className="absolute w-[400px] h-[400px] rounded-full filter blur-[80px] opacity-10 bg-[radial-gradient(circle,#6366f1,transparent)] -top-[100px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full filter blur-[80px] opacity-10 bg-[radial-gradient(circle,#8b5cf6,transparent)] -bottom-[50px] -left-[50px] pointer-events-none" />
      
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-3xl p-10 w-full max-w-[440px] relative z-10 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-center gap-2 font-outfit text-xl font-extrabold text-[var(--color-text-primary)] mb-6">
          <FaCar className="text-[var(--color-primary)]" />
          <span>Rent<span className="text-[var(--color-primary-light)]">Ride</span></span>
        </div>
        <h1 className="text-center text-2xl font-bold text-[var(--color-text-primary)] mb-1">Create Account</h1>
        <p className="text-center text-[var(--color-text-muted)] text-sm mb-8">Join RentRide and start your adventure</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-input" placeholder="Your full name" value={form.name} onChange={handleChange} required autoFocus />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Photo URL</label>
            <input type="text" name="photoURL" className="form-input" placeholder="https://example.com/photo.jpg (Optional)" value={form.photoURL} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} name="password" className="form-input pr-12" placeholder="Create a strong password" value={form.password} onChange={handleChange} required />
              <button type="button" className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-[var(--color-text-muted)] cursor-pointer text-base transition-colors hover:text-[var(--color-primary-light)]" onClick={() => setShowPass(!showPass)}>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {form.password && (
              <div className="flex flex-col gap-1 mt-2">
                {rules.map((r, i) => (
                  <span key={i} className={`flex items-center gap-1.5 text-xs ${r.test ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}`}>
                    {r.test ? <FaCheck /> : <FaTimes />} {r.label}
                  </span>
                ))}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-full justify-center mt-2" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="text-center relative my-6 before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 before:h-px before:bg-[var(--color-border)]">
          <span className="relative bg-[var(--color-bg-card)] px-4 text-[var(--color-text-muted)] text-xs">or continue with</span>
        </div>
        <button className="w-full flex items-center justify-center gap-2.5 bg-white/5 border border-[var(--color-border)] text-[var(--color-text-secondary)] p-3 rounded-lg text-sm font-medium cursor-pointer transition-colors hover:bg-white/10 hover:text-[var(--color-text-primary)]" onClick={handleGoogle}><FaGoogle /> Continue with Google</button>
        <p className="text-center text-sm text-[var(--color-text-muted)] mt-5">Already have an account? <Link href="/login" className="text-[var(--color-primary-light)] font-semibold hover:underline">Login here</Link></p>
      </div>
    </div>
  );
}
