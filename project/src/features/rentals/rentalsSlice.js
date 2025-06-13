import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rentalService from "./rentalService";

const rentalsSlice = createSlice({
    name : "rental",
    initialState :{
        rentals : [],
        rental : {},
        isError : false,
        isLoading : false,
        isSuccess : false,
        message : ""
            
    }
    ,
    reducers :{} ,
    extraReducers : builder => {
        builder
        .addCase(getRental.pending ,(state,action)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = true
        })
       
        .addCase(getRental.fulfilled ,(state,action)=>{
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.rentals = action.payload
            })
            .addCase(getRental.rejected,(state,action)=>{
                state.isError = true
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
             } )

            //  get all users 
             .addCase(getRentals.pending ,(state,action)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = true
        })
       
        .addCase(getRentals.fulfilled ,(state,action)=>{
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.rentals = action.payload
            })
            .addCase(getRentals.rejected,(state,action)=>{
                state.isError = true
                state.isLoading = false
                state.isSuccess = false
                state.message = action.message
             } )

               //  update rental
           .addCase(putRental.pending, (state) => {
  state.isLoading = true;
  state.isError = false;
  state.isSuccess = false;
})

.addCase(putRental.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;

  // Agar rentals ek array hai toh update karo rental ko
  const updatedRental = action.payload;
  const index = state.rentals.findIndex(rental => rental._id === updatedRental._id);

  if (index !== -1) {
    state.rentals[index] = updatedRental; // update totalBill, pickupDate, dropDate, etc.
  }

  // Optional: Agar single rental bhi track kar rahe ho
  state.rental = updatedRental;
})

.addCase(putRental.rejected, (state, action) => {
  state.isError = true;
  state.isLoading = false;
  state.isSuccess = false;
  state.message = action.payload || "Something went wrong while updating rental";
})

              .addCase(postRental.pending ,(state,action)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = true
        })
       
        .addCase(postRental.fulfilled ,(state,action)=>{
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.rental = action.payload
            })
            .addCase(postRental.rejected,(state,action)=>{
                state.isError = true
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
            })

            // delete rental
            .addCase(deleteRental.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            })

            .addCase(deleteRental.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "Rental deleted successfully.";

            // Rentals array se deleted rental ko hata do
            state.rentals = state.rentals.filter(
                (rental) => rental._id !== action.payload.id
            );
            })
            .addCase(deleteRental.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload || "Failed to delete rental.";
            })


                }
            })
export default rentalsSlice.reducer

// admin get rentals
export const getRental = createAsyncThunk("FETCH/RENTAL",async(_,thunkApI) =>{
    let token = thunkApI.getState().auth.user.token
 
    try{
    return rentalService.getRentalService(token)
}catch(error){
const message = error.response.data.message
return thunkApI.rejectWithValue(message)
}
})
// user add rental
export const postRental = createAsyncThunk("ADD/RENTAL",async({cid,selectedDates},thunkApI) =>{
    let token = thunkApI.getState().auth.user.token
 
    try{
    return rentalService.addRental(cid, selectedDates,token)
}catch(error){
const message = error.response.data.message
return thunkApI.rejectWithValue(message)
}
})

// get all rentals
export const getRentals = createAsyncThunk("GET/RENTALS",async(userId,thunkApI) =>{
  
    let token = thunkApI.getState().auth.user.token
 
    try{
    return rentalService.allRentals(userId , token)
}catch(error){
const message = error.response.data.message
return thunkApI.rejectWithValue(message)
}
})



// edit rental
export const putRental = createAsyncThunk("PUT/RENTALS",async({rid,formData},thunkApI) =>{
  
    let token = thunkApI.getState().auth.user.token
  
    try{
    return rentalService.editRental( rid,formData, token)
}catch(error){
const message = error.response.data.message
return thunkApI.rejectWithValue(message)
}
})

// delete rental
export const deleteRental = createAsyncThunk("DELETE/RENTALS",async(rid,thunkApI) =>{
  
    let token = thunkApI.getState().auth.user.token
   console.log(rid)
    try{
    return rentalService.deleterental( rid, token)
}catch(error){
const message = error.response.data.message
return thunkApI.rejectWithValue(message)
}
})

