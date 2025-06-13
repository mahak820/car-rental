
import { FaStar, FaGasPump, FaUsers, FaCog } from 'react-icons/fa'
import {  useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { getSingleCar } from '../features/car/carSlice'


const CarCard = ({ car }) => {
  const { name, category, imageUrl, rate, registration, fuel_type,isBooked } = car
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const handleClick = () =>{
    if(!user){
      navigate("/register")
    }else{
     navigate(`/booking/${car._id}`)
    }
  }

  return (
    <div className="card group">
      {/* Image container */}
      <div className="relative overflow-hidden h-48 sm:h-56">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
{/*         
        Status badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {/* {isPopular && (
            <span className="bg-accent-500 text-dark-900 text-xs font-semibold px-2 py-1 rounded-md">
              Popular
            </span> */}
          
          {isBooked && (
            <span className="bg-dark-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
              Booked
            </span>
          )}
        </div>

        {/* Category */}
        <div className="absolute top-3 right-3">
          <span className="bg-dark-800/80 backdrop-blur-sm text-primary-400 text-xs font-semibold px-2 py-1 rounded-md">
            {category}
          </span>
        </div>

        {/* Location
        <div className="absolute bottom-3 left-3">
          <span className="bg-dark-900/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center">
            <FaGasPump className="mr-1" /> {location}
          </span>
        </div> */}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <div className="flex items-center text-accent-400">
            <span>{registration}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center">
            <FaUsers className="mr-1" />
            <span>{fuel_type} </span>
          </div>
          {/* <div className="flex items-center">
            <FaCog className="mr-1" />
            <span>{transmission}</span>
          </div> */}
        </div>

        {/* Rate and CTA */}
        <div className="flex justify-between items-center pt-3 border-t border-dark-700">
          <div>
            <span className="text-xl font-bold text-white">₹{rate}</span>
            <span className="text-gray-400 text-sm">/day</span>
          </div>
          <button 
            className={`${!isBooked ? 'btn-primary' : 'btn-secondary opacity-75 cursor-not-allowed'}`}
            disabled={isBooked} onClick={handleClick}
          >
            {!isBooked ? 'Rent Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarCard