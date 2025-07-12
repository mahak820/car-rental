import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import carService from "./carService";


const carSlice = createSlice({
    name : "car",
    initialState : {
        cars : []
        ,
        car : {},
        isLoading : false ,
        isError : false ,
        isSuccess : false,
        message : ""
    },
    reducers : {},
    extraReducers : builder => {
        builder
        //GET CAR CASES
        .addCase(getCars.pending ,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                 // state.message =
        })
        .addCase(getCars.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.cars = action.payload
        })
        .addCase(getCars.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.message
        })
        //ADD CAR CASE(ADMIN)
        .addCase(addCar.pending ,(state,action)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
             // state.message =
        })
        .addCase(addCar.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.cars = [...state.cars , action.payload]
        })
        .addCase(addCar.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.message
        })

    //    dalate car
        .addCase(deletedCar.pending ,(state,action)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
             // state.message =
        })
        .addCase(deletedCar.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.cars = state.cars.filter(car => car._id !== action.payload._id);

        })
        .addCase(deletedCar.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
        })
          //    edit car
          .addCase(editCar.pending ,(state,action)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
             // state.message =
        })
        .addCase(editCar.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.cars = state.cars.map(car => car._id === action.payload._id ? action.payload :car);

        })
        .addCase(editCar.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
        })
        // get single car
         .addCase(getSingleCar.pending ,(state,action)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
           
        })
        .addCase(getSingleCar.fulfilled ,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.car =  action.payload
          

        })
        .addCase(getSingleCar.rejected ,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
        })

     
    }
})
export default carSlice.reducer
 

// get car
export const getCars = createAsyncThunk("FETCH/CARS", async(_,thunkAPI)=>{
         let token = thunkAPI.getState().auth.user.token

    try{
 return await carService.fetchCars(token)
    }catch(error){
       const message = error.response.data.message
       return thunkAPI.rejectWithValue(message) 
    }
 })


//  add car 
 export const addCar = createAsyncThunk("ADD/CARS", async(newCar,thunkAPI) =>{
     let token = thunkAPI.getState().auth.user.token


    try{
        return await carService.addCar(newCar,token)
    }catch(error){
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
 })


//  delete car

 export const deletedCar = createAsyncThunk("DELETE/CARS",async(cid,thunkAPI)=>{
   
   let token = thunkAPI.getState().auth.user.token
    try{
        return await carService.DeleteCar(cid,token)
    }catch(error){
const message =  (error.response && error.response.data && error.response.data.message) ||
error.message ||
"Unknown error";
return thunkAPI.rejectWithValue(message)
    }
})


// edit car 
 export const editCar = createAsyncThunk("EDIT/CARS",async({cid , editCarData},thunkAPI)=>{
    let token = thunkAPI.getState().auth.user.token

    try{
     return await carService.editCar(cid,editCarData,token)
    }catch(error){
const message = error.response.data.message
return thunkAPI.rejectWithValue(message)
    }
 })


 
export const getSingleCar = createAsyncThunk("FETCH/CAR", async(cid,thunkAPI)=>{
     
    let token = thunkAPI.getState().auth.user.token
   
    
    try{
 return await carService.fetchSingleCar(cid,token)
 
    }catch(error){
       const message = error.response.data.message
       return thunkAPI.rejectWithValue(message) 
    }
 })
