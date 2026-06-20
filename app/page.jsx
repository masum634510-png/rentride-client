"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCar, FaShieldAlt, FaHeadset, FaStar, FaArrowRight } from "react-icons/fa";
import CarCard from "../components/CarCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    axios.get(`${API_URL}/cars`).then((res) => {
      setCars(res.data.slice(0, 6));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const features = [
    { icon: <FaCar />, title: "Wide Selection", desc: "SUVs, Sedans, Luxury & more — pick the perfect ride for any occasion." },
    { icon: <FaShieldAlt />, title: "Fully Insured", desc: "Every car is fully insured and regularly inspected for your peace of mind." },
    { icon: <FaHeadset />, title: "24/7 Support", desc: "Our dedicated team is always ready to assist you around the clock." },
    { icon: <FaStar />, title: "Top Rated", desc: "Thousands of happy customers trust RentRide for their travel needs." },
  ];

  const testimonials = [
    { name: "Arif Hossain", role: "Business Traveler", text: "RentRide made my business trip so comfortable. The car was spotless and the booking was instant!", rating: 5, avatar: "https://i.pravatar.cc/60?img=11" },
    { name: "Nadia Islam", role: "Weekend Explorer", text: "Amazing selection of cars! Found the perfect SUV for our family road trip. Highly recommended!", rating: 5, avatar: "https://i.pravatar.cc/60?img=5" },
    { name: "Karim Uddin", role: "Daily Commuter", text: "Affordable prices and premium cars. RentRide is my go-to rental service every time.", rating: 5, avatar: "https://i.pravatar.cc/60?img=8" },
  ];

  return (
    <div className="pt-20">
      {/* BANNER */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full filter blur-[80px] opacity-20 bg-[radial-gradient(circle,#6366f1,transparent)] -top-[100px] -left-[100px]" />
          <div className="absolute w-[400px] h-[400px] rounded-full filter blur-[80px] opacity-20 bg-[radial-gradient(circle,#8b5cf6,transparent)] -bottom-[50px] -right-[50px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <span className="inline-block bg-indigo-500/15 text-indigo-400 border border-[var(--color-border)] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              🚗 Premium Car Rental Platform
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold text-[var(--color-text-primary)] mb-5 leading-tight">
              Drive Your <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-400 bg-clip-text text-transparent">Dream Car</span><br />
              Anywhere, Anytime
            </h1>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-[480px] mx-auto lg:mx-0 mb-8 leading-relaxed">
              Explore our curated fleet of premium vehicles. From sporty SUVs to luxurious sedans — your perfect ride is just a click away.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start flex-wrap mb-10">
              <Link href="/explore-cars" className="btn btn-primary btn-lg">
                Explore Cars <FaArrowRight />
              </Link>
              <Link href="/register" className="btn btn-outline btn-lg">
                Get Started Free
              </Link>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-6">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent">500+</span>
                <span className="text-xs text-[var(--color-text-muted)]">Cars Available</span>
              </div>
              <div className="w-px h-9 bg-[var(--color-border)]" />
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent">10K+</span>
                <span className="text-xs text-[var(--color-text-muted)]">Happy Customers</span>
              </div>
              <div className="w-px h-9 bg-[var(--color-border)]" />
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent">50+</span>
                <span className="text-xs text-[var(--color-text-muted)]">City Coverage</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.4)] w-full max-w-[420px] animate-[float_4s_ease-in-out_infinite]">
              <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80" alt="Featured Car" className="w-full h-[240px] object-cover" />
              <div className="flex justify-between items-center p-5">
                <div>
                  <p className="font-bold text-base text-[var(--color-text-primary)]">BMW 5 Series</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Luxury Sedan</p>
                </div>
                <div className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent">
                  $89<span className="text-xs text-[var(--color-text-muted)]">/day</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AVAILABLE CARS */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block bg-indigo-500/15 text-indigo-400 border border-[var(--color-border)] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              Our Fleet
            </span>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-400 bg-clip-text text-transparent mb-4">
              Available Cars
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-[600px] mx-auto text-lg">
              Discover our handpicked collection of premium vehicles ready for your next adventure.
            </p>
          </div>
          
          {loading ? <LoadingSpinner /> : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.length > 0 ? cars.map((car, i) => (
                  <motion.div key={car._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                    <CarCard car={car} />
                  </motion.div>
                )) : (
                  <div className="col-span-full text-center py-20 px-8">
                    <div className="text-6xl mb-4 opacity-40">🚗</div>
                    <h3 className="text-xl text-[var(--color-text-secondary)] mb-2">No cars available yet</h3>
                    <p className="text-[var(--color-text-muted)] mb-6">Be the first to add a car listing!</p>
                    <Link href="/add-car" className="btn btn-primary">Add a Car</Link>
                  </div>
                )}
              </div>
              {cars.length > 0 && (
                <div className="text-center mt-10">
                  <Link href="/explore-cars" className="btn btn-outline btn-lg">
                    View All Cars <FaArrowRight />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 relative bg-indigo-500/[0.03]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block bg-indigo-500/15 text-indigo-400 border border-[var(--color-border)] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              Why RentRide
            </span>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-400 bg-clip-text text-transparent mb-4">
              The Smart Way to Rent
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-[600px] mx-auto text-lg">
              We make car rental simple, affordable, and enjoyable.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 text-indigo-400 text-2xl flex items-center justify-center mx-auto mb-5">
                  {f.icon}
                </div>
                <h3 className="text-lg text-[var(--color-text-primary)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block bg-indigo-500/15 text-indigo-400 border border-[var(--color-border)] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              Reviews
            </span>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-400 bg-clip-text text-transparent mb-4">
              What Our Customers Say
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-[600px] mx-auto text-lg">
              Real experiences from real travelers who chose RentRide.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} className="card p-7 flex flex-col gap-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }} viewport={{ once: true }}>
                <div className="text-base tracking-widest">{"⭐".repeat(t.rating)}</div>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed flex-1 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full border-2 border-[var(--color-primary)] object-cover" />
                  <div>
                    <p className="font-bold text-sm text-[var(--color-text-primary)]">{t.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div className="bg-gradient-to-br from-indigo-500/15 to-purple-500/10 border border-indigo-500/30 rounded-3xl p-16 text-center" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-[var(--color-text-primary)] mb-4">Ready to Hit the Road?</h2>
            <p className="text-[var(--color-text-secondary)] text-lg mb-8">Join thousands of happy drivers. Rent your dream car today.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/explore-cars" className="btn btn-primary btn-lg">Browse Fleet <FaArrowRight /></Link>
              <Link href="/register" className="btn btn-outline btn-lg">Create Account</Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
