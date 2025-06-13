import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { FaStar, FaTrash } from 'react-icons/fa'
import { useEffect } from 'react'
import { getreview } from '../../features/review/reviewSlice'

const AdminReviews = () => {
  const reviews = useSelector(state => state.review.reviews)
  const dispatch = useDispatch()
 
  useEffect (() =>{
dispatch(getreview())
  },[dispatch])

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Review Management</h1>

        <div className="grid gap-6">
          {reviews.map((review) => (
            <div key={review?._id} className="bg-dark-800 rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-lg">{review?.user?.name}</h3>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">{review?.car?.name}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review?.rating ? 'text-yellow-400' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                </div>
                <button className="text-red-400 hover:text-red-300 transition-colors">
                  <FaTrash />
                </button>
              </div>
              <p className="mt-4 text-gray-300">{review?.comment}</p>
              <div className="mt-4 text-sm text-gray-400">
  {new Date(review?.createdAt).toLocaleString()}
</div>


            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default AdminReviews