import { createSlice } from "@reduxjs/toolkit";
import { adminLogin,createUser, blockUser,updateUser } from "./adminThunk";

const token = localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : null;
const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : [];

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    token: token,
    userData: userData,
    isSuccess: false,
    isError:false,
    message:''
  },
  reducers: {
    reset: (state, action) => {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('userData');
      state.token = null;
      state.isSuccess = false;
      state.userData = [];
    },
    logout: (state) => {
      localStorage.removeItem('admin');
      localStorage.removeItem('userData');
      state.token = null;
      state.isSuccess = false;
      state.userData = [];

    },
    errorReset:(state) => {
       state.isError = false;
       state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.fulfilled, (state, action) => {
        const { token, userData } = action.payload;
        console.log("This is .addCase extraReducers adminLogin fulfilled");
        localStorage.setItem('adminToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        state.isSuccess = true;
        state.token = token;
        state.userData = userData;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        const {data} = action.payload;
        localStorage.setItem('userData', JSON.stringify(data))
        state.userData = data
      })
      .addCase(createUser.rejected,(state,action ) => {
         console.log("This is the action.payload in createUser.rejected: ", action.payload)
         state.error = action.payload.message;
         state.isSuccess = false
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("This is the updateUser fullfiled action.paylaod: ", action.payload)
         const {userId, name, phone} = action.payload
         state.userData = state.userData.map((user) => user._id == userId ? { ...user, name: name,phone:phone } : user);
      })
      .addCase(updateUser.rejected, (state, action) => {
         console.log("this is the rejectcase of updateUser action.payload: ", action.payload.error)
        
         state.isError = true;
         state.message = action.payload.error
      })
      .addCase(blockUser.fulfilled,(state, action) => {
        const {userId, status} = action.payload
        console.log("This is the payload: ", action.payload)
        state.userData = state.userData.map((user) => user._id == userId ? {...user,isActive:status} : user)
        
      })
  }
});

export const { reset, logout,errorReset } = adminSlice.actions;

export default adminSlice.reducer;
