import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8000/admin";

export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/admin-login`, {
        email: email.trim(),
        password: password.trim(),
      });
      console.log("This is the received response from Admin response ", response.data);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);



export const createUser = createAsyncThunk("admin/createUser",
            async ({userData, token }, {rejectWithValue}) => {
                                      
              try {
                console.log("This si the userData in thunk: ", userData)
                const response = await axios.post(url + '/create-user', userData, {'headers':{
                  'Authorization':`Bearer ${token}`
                 }})
                console.log("This si the response from createUser : ", response.data);
                 return response.data;
                
              }catch (error) {
                if (!error.response) {
                  throw error;
                }
                return rejectWithValue(error.response.data);
                }
       }
)

export const blockUser = createAsyncThunk("/admin/blockUser",
             async({userId, token}, {rejectWithValue}) => {
                 try {
                  const response = await axios.post(url + '/block-user', {userId},{'headers':{
                    'Authorization':`Bearer ${token}`
                   }});
                  console.log("This is the response that received from the blockUser : ", response.data);
                  if(response.data.status === 'blocked'){
                      return {status:false, userId:userId}
                  }else if(response.data.status === 'unBlocked'){
                      return {status:true,userId:userId}
                  }
                  
                  
                 } catch (error) {
                      if (!error.response) {
                        throw error;
                      }
                     return rejectWithValue(error.response.data);
                 }
             });

export const updateUser = createAsyncThunk('admin/updateUser', async ({ userId, name, phone,token }, { rejectWithValue }) => {
  try {
    console.log("Thsi si userID, name, phone: ",userId, name, phone)
    const response = await axios.post(url + '/update-user', {userId, name, phone },{'headers':{
      'Authorization':`Bearer ${token}`
     }});
    console.log("This si the response from update User: ", response)
    if (response.data.updateUser.modifiedCount == 1) {
      console.log('inside modifed count');
      console.log(userId,name);
      return { userId, name,phone}
    }else if (response.data == "Access_denied" || response.data == "authentication_failed") {
      console.log("Authentication is faliled or access_denied")
     
    } 
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});            

