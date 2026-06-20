"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import CarCard from "../../components/CarCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

const CAR_TYPES = ["all", "SUV", "Sedan", "Hatchback", "Luxury", "Electric", "Pickup", "Van"];

function ExploreContent() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState(searchParams.get("type") || "all");
  const [sort, setSort] = useState("newest");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchCars = () => {
    setLoading(true);
    axios.get(`${API_URL}/cars`, { params: { search, type, sort } })
      .then((res) => { setCars(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchCars(); }, [type, sort]);

  const handleSearch = (e) => { e.preventDefault(); fetchCars(); };

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[linear-gradient(135deg,rgba(99,102,241,0.1)_0%,rgba(139,92,246,0.05)_100%)] border-b border-[var(--color-border)] py-16 text-center">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-outfit font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-400 bg-clip-text text-transparent mb-2">Explore Our Fleet</h1>
          <p className="text-[var(--color-text-secondary)] text-lg">Find your perfect vehicle from our premium collection</p>
        </div>
      </div>

      <div className="container-custom py-10 pb-16">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-6 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-5 shadow-sm">
          <form className="flex w-full md:flex-1 gap-2 min-w-[260px]" onSubmit={handleSearch}>
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input type="text" className="w-full bg-white/5 border border-[var(--color-border)] rounded-lg py-2.5 pr-4 pl-10 text-[var(--color-text-primary)] text-sm outline-none transition-colors focus:border-indigo-500" placeholder="Search by car name..." value={search} onChange={(e)=>setSearch(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary btn-sm whitespace-nowrap">Search</button>
          </form>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <FaFilter className="text-[var(--color-primary-light)]" />
              <select className="bg-white/5 border border-[var(--color-border)] text-[var(--color-text-primary)] py-2.5 px-3.5 rounded-lg text-sm cursor-pointer outline-none focus:border-indigo-500 [&>option]:bg-[var(--color-bg-card)]" value={type} onChange={(e)=>setType(e.target.value)}>
                {CAR_TYPES.map((t)=><option key={t} value={t}>{t === "all" ? "All Types" : t}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <FaSortAmountDown className="text-[var(--color-primary-light)]" />
              <select className="bg-white/5 border border-[var(--color-border)] text-[var(--color-text-primary)] py-2.5 px-3.5 rounded-lg text-sm cursor-pointer outline-none focus:border-indigo-500 [&>option]:bg-[var(--color-bg-card)]" value={sort} onChange={(e)=>setSort(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-5">
          {!loading && <p className="text-[var(--color-text-muted)] text-sm"><span className="text-[var(--color-primary-light)] font-bold">{cars.length}</span> cars found</p>}
        </div>

        {loading ? <LoadingSpinner /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.length > 0 ? cars.map((car)=>(
              <div key={car._id}><CarCard car={car} /></div>
            )) : (
              <div className="col-span-full text-center py-20 px-8">
                <div className="text-5xl mb-4 opacity-40">🔍</div>
                <h3 className="text-xl text-[var(--color-text-secondary)] mb-2">No cars found</h3>
                <p className="text-[var(--color-text-muted)]">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExploreCars() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ExploreContent />
    </Suspense>
  );
}
