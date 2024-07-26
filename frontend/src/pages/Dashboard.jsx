import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Profile from "../component/profile";
import backgroundImage from '../images/background.png'
import '../pages/Dashboard.css'
import Header from "../component/Header";




function Dashboard() {
     const navigate = useNavigate();
     
     
     const {user} = useSelector((state) => state.auth);

     useEffect(() => {
      if(!user){
        navigate('/login')
      }
     }, [user])
  return (
    < >
      <Header/>
      <Profile user={user}/>
      
    </>
  )
}

export default Dashboard
