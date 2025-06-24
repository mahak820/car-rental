import axios from "axios"
import { api } from "../../api"

const getRentalService = async (token) =>{
   let options = {
    headers :{
         authorization : `Bearer ${token}`
    }
   } 
   const response = await axios.get(`${api}/admin/rentals`,options)
   return response.data
   
}

// add rentals
const addRental = async (cid, selectedDates,token) =>{
   let options = {
    headers :{
         authorization : `Bearer ${token}`
    }
   } 
   const response = await axios.post(`${api}/rentals/${cid}`, selectedDates,options)
   console.log(response.data)
   return response.data
}
// get all rentals
const allRentals = async (uid , token) =>{
  
   let options = {
    headers :{
         authorization : `Bearer ${token}`
    }
   } 
   const response = await axios.get(`${api}/rentals/${uid}`,options)
 
 return response.data
}


// edit rental
const editRental = async (rid,formData , token) =>{
  
   let options = {
    headers :{
         authorization : `Bearer ${token}`
    }
   } 
   const response = await axios.put(`${api}/rentals/${rid}`,formData,options)
 
 return response.data
}
// delete rental
const deleterental = async (rid, token) =>{
  console.log(rid)

   let options = {
    headers :{
         authorization : `Bearer ${token}`
    }
   } 
   const response = await axios.delete(`${api}/rentals/${rid}`,options)
 
 return response.data
}
const rentalService = {getRentalService,addRental,allRentals,editRental,deleterental}
export default rentalService
