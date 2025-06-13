import { motion } from 'framer-motion'

const StatsCard = ({ icon: Icon, label, value, trend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-800 p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="p-3 bg-primary-600/20 rounded-lg">
          <Icon className="w-6 h-6 text-primary-400" />
        </div>
        {trend && (
          <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-gray-400 text-sm mt-1">{label}</p>
      </div>
    </motion.div>
  )
}

export default StatsCard