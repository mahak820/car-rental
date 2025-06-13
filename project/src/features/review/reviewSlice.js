import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewService from "./reviewService";

const reviewSlice = createSlice({
    name :"review",
    initialState :{
       reviews : [],
       isLoading : false,
       isError : false,
       issuccess : false,
    },
    reducers :{},
    extraReducers : builder =>{
        builder.addCase(getreview.fulfilled ,(state,action) =>{
            state.isError = false
           state.issuccess = true
            state.isLoading = false
            state.reviews = action.payload
        })
        builder.addCase(getreview.rejected ,(state,action) =>{
            state.isError = false
           state.issuccess = true
            state.isLoading = false
            state.message = action.message
        })
        builder.addCase(getreview.pending,(state,action) =>{
            state.isError = false
           state.issuccess = true
            state.isLoading = false
        })
    }
})
export default reviewSlice.reducer

export const getreview = createAsyncThunk("FETCH/REVIEW",async(_,thunkAPI) =>{
const token = thunkAPI.getState().auth.user.token
console.log(token)
try{
return await reviewService.fetchReview(token)   
}catch(error){
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
}
})