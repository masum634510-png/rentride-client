"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { FaCar, FaBars, FaTimes, FaUserCircle, FaChevronDown } from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      router.push("/");
    } catch {
      toast.error("Logout failed!");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore-cars", label: "Explore Cars" },
    ...(user ? [{ href: "/add-car", label: "Add Car" }, { href: "/my-bookings", label: "My Bookings" }] : []),
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${scrolled ? "bg-[#0f0f1a]/90 backdrop-blur-md border-b border-[var(--color-border)] py-3" : "bg-transparent"}`}>
      <div className="container-custom flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-outfit text-2xl font-extrabold text-[var(--color-text-primary)]">
          <FaCar className="text-[var(--color-primary)] text-3xl" />
          <span>Rent<span className="text-[var(--color-primary-light)]">Ride</span></span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${isActive ? "text-[var(--color-text-primary)] bg-indigo-500/10" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-indigo-500/10"}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Nav */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropRef}>
              <button className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-1 rounded-full" onClick={() => setDropOpen(!dropOpen)}>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="avatar" className="w-9 h-9 rounded-full border-2 border-[var(--color-primary)] object-cover" />
                ) : (
                  <FaUserCircle size={32} color="#818cf8" />
                )}
                <FaChevronDown size={12} className={`text-[var(--color-text-muted)] transition-transform duration-300 ${dropOpen ? "rotate-180" : ""}`} />
              </button>
              {dropOpen && (
                <div className="absolute top-full right-0 mt-3 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl min-w-[200px] shadow-[var(--shadow-custom)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4">
                    <p className="font-semibold text-sm text-[var(--color-text-primary)]">{user.displayName || "User"}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5 break-all">{user.email}</p>
                  </div>
                  <div className="h-px bg-[var(--color-border)]" />
                  <Link href="/add-car" className="block px-4 py-3 text-sm text-[var(--color-text-secondary)] hover:bg-indigo-500/10 hover:text-[var(--color-text-primary)] transition-colors" onClick={() => setDropOpen(false)}>Add Car</Link>
                  <Link href="/my-bookings" className="block px-4 py-3 text-sm text-[var(--color-text-secondary)] hover:bg-indigo-500/10 hover:text-[var(--color-text-primary)] transition-colors" onClick={() => setDropOpen(false)}>My Bookings</Link>
                  <Link href="/my-added-cars" className="block px-4 py-3 text-sm text-[var(--color-text-secondary)] hover:bg-indigo-500/10 hover:text-[var(--color-text-primary)] transition-colors" onClick={() => setDropOpen(false)}>My Added Cars</Link>
                  <div className="h-px bg-[var(--color-border)]" />
                  <button className="block w-full text-left px-4 py-3 text-sm text-[var(--color-text-secondary)] hover:bg-red-500/10 hover:text-[var(--color-danger)] transition-colors" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm hidden md:flex">Login</Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden flex items-center p-2 text-[var(--color-text-primary)] text-xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`absolute top-[70px] left-0 right-0 bg-[#0f0f1a]/95 backdrop-blur-md border-b border-[var(--color-border)] flex flex-col p-6 gap-2 transition-all duration-300 md:hidden ${menuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"}`}>
          {navLinks.map((link) => {
             const isActive = pathname === link.href;
             return (
              <Link
                key={link.href}
                href={link.href}
                className={`block w-full px-4 py-3 rounded-lg font-medium text-sm transition-colors ${isActive ? "text-[var(--color-text-primary)] bg-indigo-500/10" : "text-[var(--color-text-secondary)]"}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
             )
          })}
          {user ? (
            <>
              <Link
                href="/my-added-cars"
                className={`block w-full px-4 py-3 rounded-lg font-medium text-sm transition-colors ${pathname === "/my-added-cars" ? "text-[var(--color-text-primary)] bg-indigo-500/10" : "text-[var(--color-text-secondary)]"}`}
                onClick={() => setMenuOpen(false)}
              >
                My Added Cars
              </Link>
              <button
                className="block w-full text-left px-4 py-3 rounded-lg font-medium text-sm text-[var(--color-danger)] hover:bg-red-500/10 transition-colors mt-2"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary w-full justify-center mt-2" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
