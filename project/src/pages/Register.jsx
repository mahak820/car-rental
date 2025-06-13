import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
 

// navbar
import {  useEffect } from 'react'
import {  useLocation } from 'react-router-dom'
import { FaCar, FaBars, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/auth/authSlice'



//  const {user} = useSelector(state => state.auth)


 
// register
function Register() {
  const {user,isError,message} = useSelector(state => state.auth)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect (() =>{
  if(user){
    navigate('/')
  }if(isError&& message){
    toast.error(message)
  }
  },[user,isError,message])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(formData))
    // Handle registration logic here
  
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (


    <>

    
{/* navbar */}
<nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || location.pathname !== '/' ? 'bg-dark-900/95 shadow-md backdrop-blur-sm py-3' : 'bg-transparent py-5'
    }`}>
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
         
          {/* CTA Buttons */}
        

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
      
    </nav>


    

    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">



      <div className="max-w-md w-full space-y-8 bg-dark-800 p-8 rounded-xl shadow-lg mt-20">



        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-400 hover:text-primary-300">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <label htmlFor="name" className="sr-only">Full name</label>
              <FaUser className="absolute top-3.5 left-3 text-gray-400" />
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-dark-600 bg-dark-700 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="email" className="sr-only">Email address</label>
              <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-dark-600 bg-dark-700 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="phone" className="sr-only">Phone</label>
              <FaLock className="absolute top-3.5 left-3 text-gray-400" />
              <input
                id="phone"
                name="phone"
                type="text"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-dark-600 bg-dark-700 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="Password" className="sr-only">Password</label>
              <FaLock className="absolute top-3.5 left-3 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-dark-600 bg-dark-700 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-dark-600 bg-dark-700 text-primary-500 focus:ring-primary-500"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
              I agree to the{' '}
              <a href="#" className="text-primary-400 hover:text-primary-300">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary-400 hover:text-primary-300">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex justify-center py-3"
          >
            Create account
          </button>
        </form>
      </div>
    </div>

    </>
  )
}

export default Register