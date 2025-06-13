import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

// navbar
import {  useEffect  } from 'react'
import {  useLocation } from 'react-router-dom'
import { FaCar, FaBars, FaTimes } from 'react-icons/fa'
import { loginUser } from '../features/auth/authSlice'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user , isError , message} = useSelector(state => state.auth)

  useEffect(()=> {
    if(user){
      navigate('/')
    } 
    if(user && user.isAdmin){
      navigate('/admin')
    }if(isError&& message){
      toast.error(message)
    }
  } , [user,isError,message])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    dispatch(loginUser(formData))
    // console.log('Login attempt:', formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }


  // navbar
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

    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-dark-800 p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary-400 hover:text-primary-300">
              Sign up
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
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
              <label htmlFor="password" className="sr-only">Password</label>
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-dark-600 bg-dark-700 text-primary-500 focus:ring-primary-500"
                />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary-400 hover:text-primary-300">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex justify-center py-3"
            >
            Sign in
          </button>
        </form>
      </div>
    </div>
     </>
  )
}

export default Login