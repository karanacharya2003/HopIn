// TripCard.js
import { CircleArrowRightIcon, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tripState } from '../atoms/TripContext';
const TripCard = ({ trip }) => {
  const navigate = useNavigate();
  const availableSeats = trip.available_seats - trip.companions.length;
  const [state,setState]=useRecoilState(tripState)
  


  return (
    <li className="bg-white p-4 rounded-lg mb-4 shadow-lg flex justify-between items-center border border-gray-300 hover:shadow-xl transition-shadow duration-200">
      <div>
        <h3 className="font-bold text-lg text-blue-600">{trip.driver_name}'s Ride</h3>
        <p className="text-gray-700">
          <MapPin className="inline-block mr-1" />
          {trip.source} to {trip.destination}
        </p>
        <p className="text-gray-600">
          Seats Available: <span className="font-semibold text-green-600">{availableSeats}</span>
        </p>
        <p className="text-gray-600">
          Price: <span className="font-bold text-red-600">&#8377;{trip.price}</span>
        </p>
      </div>
      <button
        className="text-blue-500 hover:underline font-semibold"
        onClick={() => {
          setState(trip)
          navigate(`/trip/${trip._id}`)
        }}

      >
        <CircleArrowRightIcon />
      </button>
    </li>
  );
};

export default TripCard;
