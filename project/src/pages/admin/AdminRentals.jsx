import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { useEffect } from 'react'
import { getRental } from '../../features/rentals/rentalsSlice'

const AdminRentals = () => {
  const { rentals } = useSelector(state => state.rental)
  
const dispatch = useDispatch()

 useEffect (() =>{
      dispatch(getRental())
      console.log(rentals)
 },[])
  
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Rental Management</h1>

        <div className="bg-dark-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dark-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Car Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Reg. No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Pickup Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Drop Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700">
                {rentals?.map((rental) => (
                  <tr key={rental._id} className="hover:bg-dark-700/50 transition-colors">
                    <td className="px-6 py-4">{rental?.user?.name || 'N/A'}</td>
                    <td className="px-6 py-4">{rental?.car?.name || 'N/A'}</td>
                    <td className="px-6 py-4">{rental?.car?.registration || 'N/A'}</td>
                    <td className="px-6 py-4">{new Date(rental?.pickupDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{new Date(rental?.dropDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">₹{rental?.totalBill}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminRentals
