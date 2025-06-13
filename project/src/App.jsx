import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCars from './pages/admin/AdminCars'
import AdminRentals from './pages/admin/AdminRentals'
import AdminReviews from './pages/admin/AdminReviews'
import Footer from './components/Footer'
import CarRentalBooking from './pages/user/carDetail'
import UserRentals from './pages/user/myBookings'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 text-white">
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/cars" element={<AdminCars />} />
          <Route path="/admin/rentals" element={<AdminRentals />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
       <Route path="/booking/:cid" element={<CarRentalBooking />} />
        <Route path="/userrentals/:userId" element={<UserRentals/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App