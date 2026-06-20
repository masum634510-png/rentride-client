import Link from "next/link";
import { FaUsers, FaMapMarkerAlt, FaStar } from "react-icons/fa";

const CarCard = ({ car }) => {
  const { _id, carName, carType, dailyRentPrice, imageUrl, seatCapacity, pickupLocation, availability, bookingCount } = car;
  const isAvailable = availability === "Available";

  return (
    <div className="card flex flex-col h-full group">
      <div className="relative h-[200px] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={carName} 
          onError={(e) => { e.target.src = "https://via.placeholder.com/400x220?text=No+Image"; }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent via-transparent" />
        <span className={`absolute top-3 right-3 badge ${isAvailable ? "badge-success" : "badge-danger"}`}>
          {availability}
        </span>
        <span className="absolute top-3 left-3 badge badge-primary">{carType}</span>
      </div>
      
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] whitespace-nowrap overflow-hidden text-ellipsis">
          {carName}
        </h3>
        <div className="flex flex-wrap gap-3">
          <span className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
            <FaUsers className="text-[var(--color-primary-light)] text-[13px]" /> {seatCapacity} Seats
          </span>
          <span className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
            <FaMapMarkerAlt className="text-[var(--color-primary-light)] text-[13px]" /> {pickupLocation}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
            <FaStar className="text-amber-500 text-[13px]" /> {bookingCount || 0} Bookings
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--color-border)]">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-400 bg-clip-text text-transparent">
              ${dailyRentPrice}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">/day</span>
          </div>
          <Link href={`/cars/${_id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
