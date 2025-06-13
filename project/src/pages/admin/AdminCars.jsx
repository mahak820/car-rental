import { useEffect, useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { addCar, getCars, deletedCar, editCar } from '../../features/car/carSlice'


const AdminCars = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const { cars, isLoading, isSuccess, isError, message } = useSelector(state => state.car)
  const dispatch = useDispatch()

  // New car form state
  const [newCar, setNewCar] = useState({
    name: '',
    company: '',
    category: '',
    fuel_type: '',
    rate: '',
    registration: '',
    imageUrl: '',
  })

  // Edit car form state
  const [editCarData, setEditCarData] = useState({
    _id: '',
    name: '',
    company: '',
    category: '',
    fuel_type: '',
    rate: '',
    registration: '',
    imageUrl: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCar({
      ...newCar,
      [name]: value
    })
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditCarData({
      ...editCarData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addCar(newCar))
    setShowAddModal(false)
    // Reset form
    setNewCar({
      name: '',
      company: '',
      category: '',
      fuel_type: '',
      rate: '',
      registration: '',
      imageUrl: '',
    })
  }

  const handleEditSubmit =async (e) => {
    e.preventDefault()
    // console.log(editCarData._id)
     await dispatch(editCar({cid : editCarData._id , editCarData}))
    setShowEditModal(false)
    // Refresh car list after edit
  
      dispatch(getCars())
   
  }

  const handleDelete = async(cid) => {
    await dispatch(deletedCar(cid))
    dispatch(getCars())
  }

  const handleEdit = (car,newCar) => {
    // dispatch(editCar(newCar))
    // Set edit car data with selected car details
    setEditCarData({
      _id: car._id,
      name: car.name,
      company: car.company,
      category: car.category,
      fuel_type: car.fuel_type,
      rate: car.rate,
      registration: car.registration,
      imageUrl: car.imageUrl,
    })
    // Show edit modal
    setShowEditModal(true)
  }
  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]); // only run once on mount
  
  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]); // error handle separately
  


  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Cars</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add New Car</span>
          </button>
        </div>

        <div className="bg-dark-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dark-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Car</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price/Day</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700">
                {cars?.map((car) => (
                  <tr key={car?._id} className="hover:bg-dark-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={car?.imageUrl} alt={car?.name} className="w-12 h-12 rounded-lg object-cover" />
                        <span className="font-medium">{car?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{car?.category}</td>
                    <td className="px-6 py-4">₹{car?.rate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        !car?.isBooked ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                      }`}>
                        {!car?.isBooked ? 'Available' : 'Rented'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(car)}
                          className="text-primary-400 hover:text-primary-300 transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(car?._id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Car Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-dark-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-dark-700">
                <h2 className="text-xl font-bold">Add New Car</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Car Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Car Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newCar.name}
                      onChange={handleInputChange}
                      className="w-full bg-dark-700 rounded-lg border border-dark-600 p-2.5 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. Maruti Swift"
                      required
                    />
                  </div>
                  
                  {/* Car Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Car Company</label>
                    <input
                      type="text"
                      name="company"
                      value={newCar.company}
                      onChange={handleInputChange}
                      className="w-full bg-dark-700 rounded-lg border border-dark-600 p-2.5 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. Maruti Suzuki"
                      required
                    />
                  </div>
                  
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                    <select
                      name="category"
                      value={newCar.category}
                      onChange={handleInputChange}
                      className="w-full bg-dark-700 rounded-lg border border-dark-600 p-2.5 focus:ring-primary-500 focus:border-primary-500"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="hatchback">Hatchback</option>
                      <option value="cuope">Coupe</option>
                      <option value="jeep">Jeep</option>
                    </select>
                  </div>
                  
                  {/* Fuel Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Fuel Type</label>
                    <select
                      name="fuel_type"
                      value={newCar.fuel_type}
                      onChange={handleInputChange}
                      className="w-full bg-dark-700 rounded-lg border border-dark-600 p-2.5 focus:ring-primary-500 focus:border-primary-500"
                      required
                    >
                      <option value="">Select Fuel Type</option>
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="ev">Electric</option>
                      <option value="cng">CNG</option>
                    </select>
                  </div>
                  
                  {/* Rate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Rate (₹/day)</label>
                    <input
                      type="number"
                      name="rate"
                      value={newCar.rate}
                      onChange={handleInputChange}
                      className="w-full bg-dark-700 rounded-lg border border-dark-600 p-2.5 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. 2500"
                      required
                    />
                  </div>
                  
                  {/* Registration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Registration Number</label>
                    <input
                      type="text"
                      name="registration"
                      value={newCar.registration}
                      onChange={handleInputChange}
                      className="w-full bg-dark-700 rounded-lg border border-dark-600 p-2.5 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. MH01AB1234"
                      required
                    />
                  </div>
                  
                  {/* imageUrl URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">imageUrl URL</label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={newCar.imageUrl}
                      onChange={handleInputChange}
                      className="w-full bg-dark-700 rounded-lg border border-dark-600 p-2.5 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. https://example.com/car.jpg"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Add Car
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Car Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-dark-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-dark-700">
                <h2 className="text-xl font-bold">Edit Car Details</h2>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              
              <form onSubmit={handleEditSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Car Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Car Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editCarData?.name}
                      onChange={handleEditInputChange}
                      className="w-full bg-dark-700 rounded-lg border border-dark-600 p-2.5 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. Maruti Swift"
                      required
                    />
                  </div>
                  
                  {/* Car Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Car Company</label>
                    <input
                      type="text"
                      name="company"
                      value={editCarData?.company}
                      onChange={handleEditInputChange}
                      className="w-full bg-dark-700 rounded-lg border border-dark-600 p-2.5 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. Maruti Suzuki"
                      required
                    />
                  </div>
                  
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                    <select
                      name="category"
                      value={editCarData?.category}
                      onChange={handleEditInputChange}
                      className="w-full bg-dark-700 rounded-lg border border-dark-600 p-2.5 focus:ring-primary-500 focus:border-primary-500"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="hatchback">Hatchback</option>
                      <option value="cuope">Coupe</option>
                      <option value="jeep">Jeep</option>
                    </select>
                  </div>
                  
                  {/* Fuel Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Fuel Type</label>
                    <select
                      name="fuel_type"
                      value={editCarData?.fuel_type}
                      onChange={handleEditInputChange}
                      className="w-full bg-dark-700 rounded-lg border border-dark-600 p-2.5 focus:ring-primary-500 focus:border-primary-500"
                      required
                    >
                      <option value="">Select Fuel Type</option>
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="ev">Electric</option>
                      <option value="cng">CNG</option>
                    </select>
                  </div>
                  
                  {/* Rate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Rate (₹/day)</label>
                    <input
                      type="number"
                      name="rate"
                      value={editCarData?.rate}
                      onChange={handleEditInputChange}
                      className="w-full bg-dark-700 rounded-lg border border-dark-600 p-2.5 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. 2500"
                      required
                    />
                  </div>
                  
                  {/* Registration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Registration Number</label>
                    <input
                      type="text"
                      name="registration"
                      value={editCarData?.registration}
                      onChange={handleEditInputChange}
                      className="w-full bg-dark-700 rounded-lg border border-dark-600 p-2.5 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. MH01AB1234"
                      required
                    />
                  </div>
                  
                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={editCarData?.imageUrl}
                      onChange={handleEditInputChange}
                      className="w-full bg-dark-700 rounded-lg border border-dark-600 p-2.5 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. https://example.com/car.jpg"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Update Car
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminCars


