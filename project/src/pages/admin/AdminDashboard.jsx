import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCar, 
  FaUsers, 
  FaStar, 
  FaMoneyBillWave, 
  FaBell, 
  FaCalendarAlt, 
  FaChartLine
} from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getCars } from '../../features/car/carSlice';
import { getRental } from '../../features/rentals/rentalsSlice';




// Enhanced stats card with animations
const StatsCard = ({ icon: Icon, label, value, trend }) => {
  const [isHovered, setIsHovered] = useState(false);
  const trendColor = trend > 0 ? 'text-emerald-400' : 'text-red-400';
  const trendSymbol = trend > 0 ? '↑' : '↓';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)' 
      }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-indigo-900/50 flex items-center justify-center">
            <Icon className="text-indigo-400 text-xl" />
          </div>
          <motion.span 
            className={`text-sm font-medium ${trendColor} flex items-center`}
            animate={{ x: isHovered ? [0, -2, 2, -2, 0] : 0 }}
            transition={{ duration: 0.4 }}
          >
            {Math.abs(trend)}% {trendSymbol}
          </motion.span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
        <p className="text-gray-400">{label}</p>
      </div>
      <div 
        className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full -mr-16 -mt-16"
      />
      <div 
        className="absolute bottom-0 left-0 w-16 h-16 bg-indigo-600/10 rounded-full -ml-8 -mb-8"
      />
    </motion.div>
  );
};

// Activity item component
const ActivityItem = ({ icon: Icon, title, time, status }) => {
  let statusColor = 'bg-gray-400';
  
  if (status === 'completed') statusColor = 'bg-emerald-400';
  if (status === 'pending') statusColor = 'bg-amber-400';
  if (status === 'cancelled') statusColor = 'bg-red-400';

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between py-4 border-b border-gray-700/50 last:border-0"
    >
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center">
          <Icon className="text-indigo-400" />
        </div>
        <div>
          <p className="text-white font-medium">{title}</p>
          <p className="text-sm text-gray-400">{time}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className={`h-2 w-2 rounded-full ${statusColor} mr-2`}></span>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

// Chart component (simplified)
const AnalyticsChart = () => {
  return (
    <div className="h-64 w-full bg-gray-800 rounded-lg p-4 relative overflow-hidden">
      <div className="flex justify-between mb-6">
        <h3 className="text-white font-medium">Revenue Overview</h3>
        <select className="bg-gray-700 text-gray-300 text-sm rounded border-none px-2">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>
      
      {/* Mock chart lines */}
      <div className="relative h-40 w-full">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gray-700"></div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="absolute bottom-0 left-0 w-full" style={{ height: `${i * 25}%` }}>
            <div className="w-full h-px bg-gray-700/50"></div>
          </div>
        ))}
        
        {/* Chart bars */}
        <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-between px-2">
          {[65, 40, 80, 55, 90, 50, 70].map((height, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="w-8 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-sm"
            >
              <div className="w-full h-1 bg-indigo-300/30 absolute bottom-0"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
 
// Main Dashboard Component
const AdminDashboard = () => {
  const dispatch = useDispatch()

  const {cars} = useSelector(state => state.car)
  const {rentals} = useSelector(state => state.rental)
  // const {reviews} = useSelector(state => state.review)
  // console.log(rentals)
  // console.log(rentals.length)

    useEffect(() => {
      dispatch(getCars());
      dispatch(getRental());
      // dispatch(getRev());
    }, [dispatch]); // only run once on mount

  const stats = [
    { icon: FaCar, label: 'Total Cars', value: cars.length, trend: 12 },
    { icon: FaUsers, label: 'Active Rentals', value: rentals.length, trend: 8 },
    { icon: FaStar, label: 'Average Rating', value: '4.8', trend: 5 },
    { icon: FaMoneyBillWave, label: 'Monthly Revenue', value: '$12,450', trend: 15 },
  ];
  
  const activities = [
    { icon: FaCar, title: 'New Tesla Model 3 rental', time: '2 minutes ago', status: 'completed' },
    { icon: FaUsers, title: 'Customer support request', time: '15 minutes ago', status: 'pending' },
    { icon: FaMoneyBillWave, title: 'Payment received for booking #2847', time: '1 hour ago', status: 'completed' },
    { icon: FaCar, title: 'Rental cancellation #1294', time: '3 hours ago', status: 'cancelled' },
  ];
  
  // Animation for page load
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Dashboard notification counter
  const [notificationCount, setNotificationCount] = useState(3);
  
  useEffect(() => {
    // Simulate new notification after 10 seconds
    const timer = setTimeout(() => {
      setNotificationCount(prev => prev + 1);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <AdminSidebar />
      <motion.main 
        className="flex-1 p-8"
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        <motion.div 
          className="mb-8 flex justify-between items-center"
          variants={itemVariants}
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-gray-400 mt-2">Welcome back, Admin!</p>
          </div>
          <div className="flex items-center space-x-6">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBell className="text-gray-400 text-xl hover:text-indigo-400 cursor-pointer transition-colors" />
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
              >
                {notificationCount}
              </motion.span>
            </motion.div>
            <motion.div 
              className="w-10 h-10 bg-indigo-600/30 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold">A</span>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <motion.div 
            className="lg:col-span-2 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <FaChartLine className="mr-2 text-indigo-400" />
                Analytics Overview
              </h2>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                View All
              </motion.button>
            </div>
            <AnalyticsChart />
          </motion.div>
          
          <motion.div 
            className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <FaCalendarAlt className="mr-2 text-indigo-400" />
                Recent Activity
              </h2>
              <span className="text-sm text-gray-400">Today</span>
            </div>
            <div className="space-y-1">
              {activities.map((activity, index) => (
                <ActivityItem 
                  key={index} 
                  {...activity} 
                />
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={itemVariants}
        >
          <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Popular Cars</h2>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                View All
              </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((_, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-700/50 p-4 rounded-lg flex items-center space-x-4 cursor-pointer"
                >
                  <div className="w-16 h-16 bg-indigo-900/30 rounded-lg flex items-center justify-center">
                    <FaCar className="text-2xl text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{i === 0 ? 'Tesla Model S' : 'BMW i8'}</h3>
                    <div className="flex mt-1 items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, idx) => (
                          <FaStar key={idx} className="text-amber-400 text-xs" />
                        ))}
                      </div>
                      <span className="text-gray-400 text-xs ml-2">
                        {i === 0 ? '24 rentals this week' : '18 rentals this week'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
            </div>
            <div className="space-y-3">
              {['Add New Car', 'Create Report', 'Manage Users', 'View Payments'].map((action, i) => (
                <motion.button 
                  key={i}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(79, 70, 229, 0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-gray-700/50 rounded-lg text-white text-left hover:bg-indigo-600/10 transition-colors"
                >
                  {action}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default AdminDashboard;