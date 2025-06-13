import { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { FaCar, FaBars, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/auth/authSlice'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const {user} =useSelector(state => state.auth)
  const navigate = useNavigate()
  

  const dispatch = useDispatch()
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 10) {
  //       setIsScrolled(true)
  //     } else {
  //       setIsScrolled(false)
  //     }
  //   }
  

  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])
    const handleLogout = () =>{
      dispatch(logoutUser())
    } 

     // Function to handle My Bookings navigation
  const handleMyBookingsClick = (e) => {
    e.preventDefault()


    if (user) {
      

      navigate(`/userrentals/${user.id}`)
    } else {
      // If user is not logged in, redirect to login
      navigate('/register')
    }
  }
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 `}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaCar className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              QuickCar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white/90 hover:text-primary-400 transition-colors">
              Home
            </Link>
            <a href="#" className="text-white/90 hover:text-primary-400 transition-colors">
              Cars
            </a>
            <a href="#" className="text-white/90 hover:text-primary-400 transition-colors">
              Deals
            </a>
            <a href="#" className="text-white/90 hover:text-primary-400 transition-colors"  onClick={handleMyBookingsClick}>
             My Bookings
            </a>
            <a href="#" className="text-white/90 hover:text-primary-400 transition-colors">
              About
            </a>
          </div>

          {/* CTA Buttons */}
          {user ? <button className=" hidden md:flex items-center space-x-4 text-white/90 hover:text-blue-300 border border-white rounded-md py-2 px-4 transition-colors" onClick={handleLogout}>logout</button> : <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-white/90 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="btn-primary">
              Register
            </Link>
          </div> 
         }

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-dark-900/95 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden py-0'
        }`}
      >
        <div className="container-custom flex flex-col space-y-4">
          <Link to="/" className="text-white/90 hover:text-primary-400 py-2 transition-colors">
            Home
          </Link>
          <a href="#" className="text-white/90 hover:text-primary-400 py-2 transition-colors">
            Cars
          </a>
          <a href="#" className="text-white/90 hover:text-primary-400 py-2 transition-colors">
            Deals
          </a>
          <a href="#" className="text-white/90 hover:text-primary-400 py-2 transition-colors"  onClick={handleMyBookingsClick}>
           My Bookings
          </a>
          <a href="#" className="text-white/90 hover:text-primary-400 py-2 transition-colors">
            About
          </a>
         
          {user ? (
            <button className="text-white/90 hover:text-blue-300 border border-white rounded-md py-2 px-4 transition-colors" onClick={handleLogout}>logout</button>) :
           (<div className="md:hidden border-t border-white flex flex-col space-y-2 pt-2">
            <Link to="/login" className="text-white/90 hover:text-white transition-colors my-2">
              Sign In
            </Link>
            <Link to="/register" className="btn-primary">
              Register
            </Link>
          </div> )
         }

        </div>
      </div>
    </nav>
  )
}

export default Navbar