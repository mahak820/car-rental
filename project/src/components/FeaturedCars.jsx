import { useEffect, useState } from 'react'
import CarCard from './CarCard'

import { FaChevronDown, FaCar, FaFilter } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getCars } from '../features/car/carSlice'

const FeaturedCars = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  
  
  const dispatch = useDispatch()
  const {cars} = useSelector(state =>state.car)
  
  const categories = ['all', ...new Set(cars.map(car => car.category.toLowerCase()))]
  

  const filteredCars = activeFilter === 'all' 
    ? cars 
    : cars.filter(car => car.category.toLowerCase() === activeFilter)

 useEffect(() => {
     dispatch(getCars());
     
   }, [dispatch]); // only run once on mount

  return (
    <section id="featured-cars" className="section bg-dark-900">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Cars
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Choose from our selection of premium vehicles for your next journey.
              We offer competitive rates and exceptional service.
            </p>
          </div>
          <a href="#" className="mt-4 md:mt-0 text-primary-400 hover:text-primary-300 transition-colors flex items-center">
            View all cars <FaChevronDown className="ml-1 transform rotate-[-90deg]" />
          </a>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden w-full flex items-center justify-between btn-secondary mb-4"
          >
            <span className="flex items-center">
              <FaFilter className="mr-2" /> Filter Cars
            </span>
            <FaChevronDown className={`transition-transform duration-300 ${showFilters ? 'transform rotate-180' : ''}`} />
          </button>
          
          <div className={`grid grid-cols-2 gap-2 md:flex md:flex-wrap md:gap-4 ${showFilters ? 'block' : 'hidden md:flex'}`}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center 
                  ${activeFilter === category 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                  }`}
              >
                <FaCar className="mr-2" />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map(car => (
            <CarCard key={car._id} car={car} />
          
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Don't see what you're looking for?</p>
          <button className="btn-primary">
            Browse All Cars
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCars