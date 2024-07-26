import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import axios from 'axios';
const url = 'http://localhost:8000/api/users';

// Get user from localStorage
const storedUser = localStorage.getItem('user');
let user = null;
if (storedUser) {
  try {
    user = JSON.parse(storedUser);
  } catch (e) {
    console.error("Failed to parse user from localStorage:", e);
    localStorage.removeItem('user'); 
  }
}

const initialState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};


export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    console.log("An error is found in register thunk");
    const message = (error.response && error.response.data && error.response.data.message) ||
      error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const addImage = createAsyncThunk('auth/addImage', async ({ image, userId,token }, thunkAPI) => {
  try {
    console.log("This is image and userId: ", image);
    const formData = new FormData();
    formData.append('file', image);
    formData.append('userId', userId);
    

    return await authService.addImage(formData,token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) ||
      error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const response =  await authService.login(user);
    console.log("This is the response axios from login: ", response);
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) ||
      error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const editUserProfile = createAsyncThunk('auth/profileEdit', async (userData, thunkAPI) => {
  try {
    return await authService.editUserProfile(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) ||
      error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("This is action.paylaod: ", action.payload)
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(addImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data;
      })
      .addCase(addImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        console.log("This is the .addCase update: action.payload;", action.payload.data);
        const { data } = action.payload;
        state.user = data;
      });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
