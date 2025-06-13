import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaHome, FaCar, FaClipboardList, FaComments, FaSignOutAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../features/auth/authSlice'

const AdminSidebar = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlesubmit = () => {
 dispatch(logoutUser())
 navigate("/")

 console.log("object")
  }

  const menuItems = [
    { path: '/admin', icon: FaHome, label: 'Dashboard' },
    { path: '/admin/cars', icon: FaCar, label: 'Cars' },
    { path: '/admin/rentals', icon: FaClipboardList, label: 'Rentals' },
    { path: '/admin/reviews', icon: FaComments, label: 'Reviews' },
  ]

  return (
    <div className="bg-dark-800 w-64 min-h-screen p-4 transition-all duration-300">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-primary-400">Admin Panel</h2>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              location.pathname === path
                ? 'bg-primary-600/20 text-primary-400'
                : 'text-gray-400 hover:bg-dark-700'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
        
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-gray-400 hover:bg-dark-700 mt-8" onClick={() =>handlesubmit()}>
          <FaSignOutAlt className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  )
}

export default AdminSidebar