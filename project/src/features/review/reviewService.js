import axios from "axios"
import { api } from "../../api"

const fetchReview = async (token) =>{
 let options = {
headers:{
    authorization : `Bearer ${token}`
}
 }
 console.log(token)
 const response = await axios.get(`${api}/admin/reviews`,options)
 return response.data

}
const reviewService = {fetchReview}
export default reviewService