import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRental, getRentals, putRental } from '../../features/rentals/rentalsSlice';
import {
  Calendar,
  Car,
  Clock,
  Filter,
  Search,
  ArrowLeft,
  Edit3,
  Trash2,
  X
} from 'lucide-react';

const UserRentals = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRental, setEditingRental] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    pickupDate: '',
    dropDate: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rentals } = useSelector(state => state.rental);
  const { userId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getRentals(userId)).finally(() => setIsLoading(false));
  }, [dispatch, userId]);

  const formatDateToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleEdit = (rid) => {
    if (!formData.pickupDate || !formData.dropDate) {
      alert('Please select both pickup and drop dates');
      return;
    }

    const [pickupDay, pickupMonth, pickupYear] = formData.pickupDate.split('-').reverse();
    const [dropDay, dropMonth, dropYear] = formData.dropDate.split('-').reverse();
    const pickup = new Date(`${pickupYear}-${pickupMonth}-${pickupDay}`);
    const drop = new Date(`${dropYear}-${dropMonth}-${dropYear}`);

    if (pickup >= drop) {
      alert('Drop date must be after pickup date');
      return;
    }

    dispatch(putRental({
      rid,
      formData
    }));

    setEditingRental(null);
  };

  const filteredRentals = (rentals || []).filter((rental) => {
    const carName = rental?.car?.name || '';
    const bookingId = rental?._id || '';
    const matchesFilter = activeFilter === 'all' || rental?.status === activeFilter;
    const matchesSearch =
      carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookingId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleDelete = (rid) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      dispatch(deleteRental(rid));
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'upcoming':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-6 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => navigate("/")}
                  className="group flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-xl transition-all duration-300 border border-gray-600/50 hover:border-primary-500/50"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  Back to Home
                </button>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-3">
                My Rentals
              </h1>
              <p className="text-gray-400 text-lg">Manage and track all your car rentals</p>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="bg-gradient-to-r from-primary-500/20 to-primary-600/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-primary-500/30">
                <div className="text-3xl font-bold text-primary-400 animate-pulse">
                  {rentals?.length || 0}
                </div>
                <div className="text-sm text-primary-300 font-medium">Total Bookings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-6 mb-8 animate-slide-up">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary-400 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search by car name or booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 focus:bg-gray-700/80 outline-none transition-all duration-300"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {['all', 'active', 'completed', 'upcoming', 'cancelled'].map((status, index) => (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeFilter === status
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white border border-gray-600/50 hover:border-gray-500/50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rentals Grid */}
        <div className="space-y-6">
          {filteredRentals.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-12 text-center animate-fade-in">
              <Car className="w-20 h-20 text-gray-500 mx-auto mb-6 animate-bounce" />
              <h3 className="text-2xl font-semibold text-gray-300 mb-3">No rentals found</h3>
              <p className="text-gray-500 text-lg">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredRentals.map((rental, index) => (
              <div 
                key={rental?._id} 
                className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-6 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 hover:border-primary-500/30 animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/3 relative overflow-hidden rounded-xl">
                    <img
                      src={rental?.car?.imageUrl}
                      alt={rental?.car?.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                          {rental?.car?.name}
                        </h3>
                        <p className="text-primary-400 text-xl font-semibold mt-1">
                          ₹{rental?.totalBill?.toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(rental?.status)} backdrop-blur-sm`}>
                        {rental?.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {formatDateToDDMMYYYY(rental?.pickupDate)} - {formatDateToDDMMYYYY(rental?.dropDate)}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => {
                          setEditingRental({ ...rental });
                          setFormData({
                            pickupDate: formatDateToDDMMYYYY(rental?.pickupDate),
                            dropDate: formatDateToDDMMYYYY(rental?.dropDate)
                          });
                        }}
                        className="group/btn flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                      >
                        <Edit3 className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                        Edit Booking
                      </button>
                      <button 
                        onClick={() => handleDelete(rental?._id)}
                        className="group/btn flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
                      >
                        <Trash2 className="w-4 h-4 group-hover/btn:shake transition-transform duration-300" />
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Edit Booking Modal */}
        {editingRental && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl animate-slide-up transform">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  Edit Booking
                </h2>
                <button
                  onClick={() => setEditingRental(null)}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors duration-300"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={formData.pickupDate.split('-').reverse().join('-')}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        pickupDate: formatDateToDDMMYYYY(e.target.value)
                      }));
                    }}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Drop Date
                  </label>
                  <input
                    type="date"
                    value={formData.dropDate.split('-').reverse().join('-')}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        dropDate: formatDateToDDMMYYYY(e.target.value)
                      }));
                    }}
                    min={formData.pickupDate.split('-').reverse().join('-')}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-xl transition-all duration-300 font-medium"
                    onClick={() => setEditingRental(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl transition-all duration-300 font-medium transform hover:scale-105 shadow-lg hover:shadow-primary-500/25"
                    onClick={() => handleEdit(editingRental?._id)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .group-hover/btn:hover .shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default UserRentals;