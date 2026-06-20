import Link from "next/link";
import { FaCar, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[var(--color-bg-card2)] border-t border-[var(--color-border)] pt-16 pb-0 relative overflow-hidden mt-auto">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.12)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 mb-12 relative z-10">
          
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-2 font-outfit text-2xl font-extrabold text-[var(--color-text-primary)] mb-4">
              <FaCar className="text-[var(--color-primary)]" /> 
              <span>Rent<span className="text-[var(--color-primary-light)]">Ride</span></span>
            </Link>
            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6 max-w-sm">
              Your premium car rental experience. Explore the road in style with RentRide's curated fleet.
            </p>
            <div className="flex gap-3">
              {[FaXTwitter, FaFacebook, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-[var(--color-border)] text-[var(--color-text-secondary)] text-base transition-all hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] hover:-translate-y-1">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] mb-5 uppercase tracking-wide">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Explore Cars", href: "/explore-cars" },
                { label: "Add Car", href: "/add-car" },
                { label: "My Bookings", href: "/my-bookings" },
                { label: "Register", href: "/register" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-[var(--color-text-muted)] text-sm transition-all hover:text-[var(--color-primary-light)] hover:pl-1">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] mb-5 uppercase tracking-wide">Car Types</h4>
            <ul className="flex flex-col gap-2.5">
              {["SUV", "Sedan", "Hatchback", "Luxury", "Electric"].map((type, i) => (
                <li key={i}>
                  <Link href={`/explore-cars?type=${type}`} className="text-[var(--color-text-muted)] text-sm transition-all hover:text-[var(--color-primary-light)] hover:pl-1">
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] mb-5 uppercase tracking-wide">Contact Us</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-[var(--color-text-muted)] text-sm">
                <FaMapMarkerAlt className="text-[var(--color-primary)] mt-0.5 shrink-0" />
                <span>123 Fleet Avenue, Dhaka, BD</span>
              </li>
              <li className="flex items-start gap-2.5 text-[var(--color-text-muted)] text-sm">
                <FaPhone className="text-[var(--color-primary)] mt-0.5 shrink-0" />
                <span>+880 1800-DRIVE</span>
              </li>
              <li className="flex items-start gap-2.5 text-[var(--color-text-muted)] text-sm">
                <FaEnvelope className="text-[var(--color-primary)] mt-0.5 shrink-0" />
                <span>hello@rentride.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-muted)] text-sm text-center md:text-left">
            © {new Date().getFullYear()} RentRide. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-[var(--color-text-muted)]">
            <a href="#" className="hover:text-[var(--color-primary-light)] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-[var(--color-primary-light)] transition-colors">Terms of Service</a>
          </div>
          <p className="text-[var(--color-text-muted)] text-sm text-center md:text-right">
            Built with ❤️ for car enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
