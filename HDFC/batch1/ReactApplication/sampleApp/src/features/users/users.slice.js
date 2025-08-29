import { BACKEND_API } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userServices from "@/services/authService"


/// create an async thunk with proper error handling
export const getUsers = createAsyncThunk(
  "users/getUsers", // (small fix: action type should not start with "/")
  async ()=>{
       return await userServices.getUsers()
       
  }
);

export const signupUser = createAsyncThunk("users/signup", async(userData)=>{
    await userServices.signup(userData)
})

/// addUser --> signup
// upDateUSer
// delete User 

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error when starting a new fetch
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // ✅ safe because always returns something
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed To Get The Users";
      })
      .addCase(signupUser.pending, (state, action) => {
        
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        
      })
       .addCase(signupUser.rejected, (state, action) => {
        
      })
  },
});

export default userSlice.reducer;
