import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Cog, 
  Shield, 
  Phone, 
  Mail, 
  Car,
  Clock,
  CheckCircle,
  MapPin,
  Fuel
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postRental } from '../../features/rentals/rentalsSlice';
import { getSingleCar } from '../../features/car/carSlice';

const CarRentalBooking = () => {
  const [selectedDates, setSelectedDates] = useState({
    pickupDate: '',
    dropDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cid } = useParams();
  const car = useSelector(state => state.car.car);

  useEffect(() => {
    if (cid) {
      setIsLoading(true);
      dispatch(getSingleCar(cid)).finally(() => setIsLoading(false));
    }
  }, [cid, dispatch]);

  const calculateDays = () => {
    if (selectedDates.pickupDate && selectedDates.dropDate) {
      const pickup = new Date(selectedDates.pickupDate);
      const dropDate = new Date(selectedDates.dropDate);
      const diffTime = Math.abs(dropDate - pickup);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1;
    }
    return 1;
  };

  const totalAmount = car?.rate ? car.rate * calculateDays() : 0;
  const taxes = totalAmount * 0.15;
  const finalAmount = totalAmount + taxes;

  const handleSubmit = () => {
    if (!selectedDates.pickupDate || !selectedDates.dropDate) {
      alert('Please fill in all required fields');
      return;
    }
    setShowSummary(true);
  };

  const handleConfirmBooking = () => {
    const updateRental = { ...car, isBooked: true };
    dispatch(postRental({ cid, selectedDates }));
    console.log(cid);

    alert('Booking confirmed! You will receive a confirmation email shortly.');
    navigate('/');
  };

  if (isLoading || !car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 animate-slide-in-left">
            <button 
              className="group p-3 hover:bg-gray-700/50 rounded-xl transition-all duration-300 border border-gray-600/50 hover:border-primary-500/50" 
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:text-primary-400 group-hover:-translate-x-1 transition-all duration-300" />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Complete Your Booking
              </h1>
              <p className="text-gray-400 text-lg mt-1">Fill in the details to rent your dream car</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Car Details Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-8 animate-slide-up">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                <Car className="w-6 h-6 text-primary-500" />
                Selected Vehicle
              </h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative group overflow-hidden rounded-xl">
                  <img 
                    src={car.imageUrl} 
                    alt={car.name}
                    className="w-full md:w-48 h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                    {car.name}
                  </h3>
                  <p className="text-primary-400 font-medium text-lg">{car.category}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-2 rounded-lg">
                      <Cog className="w-4 h-4 text-primary-400" />
                      {car.registration}
                    </div>
                    <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-2 rounded-lg">
                      <Fuel className="w-4 h-4 text-primary-400" />
                      {car.fuel_type}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary-500">₹{car.rate}</p>
                  <p className="text-sm text-gray-400 font-medium">per day</p>
                </div>
              </div>
            </div>

            {/* Rental Details Form */}
            <div className="space-y-8">
              {/* Date & Time Selection */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-primary-500" />
                  Rental Period
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDates.pickupDate}
                      onChange={(e) => {
                        const newPickupDate = e.target.value;
                        setSelectedDates((prev) => ({
                          pickupDate: newPickupDate,
                          dropDate: prev.dropDate && prev.dropDate < newPickupDate ? '' : prev.dropDate,
                        }));
                      }}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300 hover:bg-gray-700/70"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Return Date
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDates.dropDate}
                      onChange={(e) => setSelectedDates({...selectedDates, dropDate: e.target.value})}
                      min={selectedDates.pickupDate || new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300 hover:bg-gray-700/70"
                    />
                  </div>
                </div>
              </div>

              {!showSummary && (
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/25 animate-slide-up"
                  style={{ animationDelay: '0.4s' }}
                >
                  Review Booking Details
                </button>
              )}
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-8 sticky top-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl font-semibold text-white mb-6">Booking Summary</h2>
              
              {/* Rental Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Vehicle</span>
                  <span className="font-medium text-white text-right">{car.name}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Rental Period</span>
                  <span className="font-medium text-primary-400">
                    {calculateDays()} day{calculateDays() > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Daily Rate</span>
                  <span className="font-medium text-white">₹{car.rate}</span>
                </div>
              </div>

              <div className="border-t border-gray-600 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">Total</span>
                  <span className="text-2xl font-bold text-primary-500">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {showSummary && (
                <div className="mt-6 space-y-4 animate-fade-in">
                  <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Ready to Book</span>
                    </div>
                    <p className="text-sm text-green-300 mt-2">
                      All details verified. Click confirm to complete your booking.
                    </p>
                  </div>
                  
                  <button
                    onClick={handleConfirmBooking}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                  >
                    Confirm Booking
                  </button>
                  
                  <button
                    onClick={() => setShowSummary(false)}
                    className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50"
                  >
                    Edit Details
                  </button>
                </div>
              )}

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t border-gray-600">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary-500" />
                  Need Help?
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors duration-300 cursor-pointer">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors duration-300 cursor-pointer">
                    <Mail className="w-4 h-4" />
                    <span>support@carrental.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CarRentalBooking;