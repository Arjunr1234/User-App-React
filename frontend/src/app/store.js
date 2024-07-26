import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authUser/authSlice'
import adminSlice from '../features/authAdmin/adminSlice'

export const store = configureStore({
  reducer: { 
    auth:authReducer,
    admin:adminSlice
  },
});
