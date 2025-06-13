import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const authSlice = createSlice({
name : "auth",
initialState :{
    user : JSON.parse(localStorage.getItem('user')) || null,
    isLoading : false ,
    isError : false,
    isSuccess : false,
    message : ""

},
reducers : {},
extraReducers : builder =>{
  builder
  .addCase(registerUser.pending,(state,action) => {
    state.isLoading = true
    state.isError = false
    state.isSuccess = false

  })
  .addCase(registerUser.fulfilled,(state,action) => {
    state.isLoading = false
    state.isError = false
    state.user = action.payload
    state.isSuccess = true

  })
  .addCase(registerUser.rejected,(state,action) => {
    state.isLoading = false
    state.isError = true
    state.isSuccess = false
    state.message = action.payload

  })
  .addCase(loginUser.pending,(state,action) => {
    state.isLoading = true
    state.isError = false
    state.isSuccess = false

  })
  .addCase(loginUser.fulfilled,(state,action) => {
    state.isLoading = false
    state.isError = false
    state.user = action.payload
    state.isSuccess = true

  })
  .addCase(loginUser.rejected,(state,action) => {
    state.isLoading = false
    state.isError = true
    state.isSuccess = false
    state.message = action.payload

  })
  .addCase(logoutUser.fulfilled, (state) => {
    state.user = null;
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = false;
    state.message = "";
});
}

})
export default authSlice.reducer

// user login
export const loginUser = createAsyncThunk("AUTH/LOGIN",async(formData,thunkAPI) => {
   try{
 return await authService.login(formData)
   } catch(error) {
 const message = error.response.data.message
 return thunkAPI.rejectWithValue(message);
   }
})
// user register
export const registerUser = createAsyncThunk("AUTH/REGISTER",async(formData,thunkAPI) => {
  try{
return await authService.register(formData)
  } catch(error) {
const message = error.response.data.message

return thunkAPI.rejectWithValue(message);
  }
})

export const logoutUser = createAsyncThunk(
  "AUTH/LOGOUT",
  async (_, thunkAPI) => {

      try {
          await authService.logout();
      } catch (error) {
          const message = error.response?.data?.message || error.message;
          return thunkAPI.rejectWithValue(message);
      }
  }
);
