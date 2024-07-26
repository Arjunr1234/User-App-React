import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users'

// Register user

const register = async(userData) => {
    const response = await axios.post(API_URL+'/register', userData);
    
    console.log("This is respone.data : ", response.data)
    if(response.data){
      localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login User
const login = async(userData) => {
  const response = await axios.post(API_URL+'/login', userData);
  console.log("This is response.data: ",response.data);
  if(response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// logout user

const logout = () => {
  localStorage.removeItem('user')
}

const addImage = async (formData,token) => {
  console.log("This is formData in add image: ", formData)
  
  const response = await axios.post(API_URL + '/addImage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization':`Bearer ${token}`
    }
  });
  console.log("This is the response from addImage: ", response.data);
  localStorage.setItem('user', JSON.stringify(response.data.data))
  return response.data;
}

const editUserProfile = async(userData) => {
    

     const response = await axios.post(API_URL + '/profileEdit',userData,{'headers':{
      'Authorization':`Bearer ${userData.token}`
     }} )
     
     if(response.data){
      localStorage.setItem('user',JSON.stringify(response.data.data))
     }
     return response.data
}

const authService = {
  register,
  logout,
  login,
  addImage,
  editUserProfile
}

export default authService