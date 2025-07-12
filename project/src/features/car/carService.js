import axios from "axios"
import { api } from "../../api"
// get car
const fetchCars = async(token) =>{
     let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
const response = await axios.get(`${api}/car`,options)
return response.data
}
// add car
const addCar = async(newCar,token) =>{
    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(`${api}/admin/car`,newCar , options)      
    return response.data  
}
// deletecar
const DeleteCar = async(cid,token)=>{
  
    
let options = {
    headers :{
        authorization : `Bearer ${token}`
    }
}
const response = await axios.delete(`${api}/admin/car/${cid}` ,options)
return response.data

}

// edit car
const editCar = async(cid,editCarData,token)=>{

    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
const response = await axios.put(`${api}/admin/car/${cid}`,editCarData,options)
return response.data

}

// / get single car
const fetchSingleCar = async(cid,token) =>{
 
      let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
const response = await axios.get(`${api}/car/${cid}`,options)

return response.data

}

const carService = {addCar,DeleteCar,editCar,fetchSingleCar,fetchCars}
export default carService