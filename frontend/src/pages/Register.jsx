import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import { FaUser } from "react-icons/fa"
import { register, reset } from "../features/auth/authSlice"

function Register() {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    cPassword:''
  })

  const {name, email, password, cPassword} = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading, isError, message} = useSelector(
    (state) => state.auth
  )

  const onChange = (e) => {
     setFormData((prevState) => ({
        ...prevState,
        [e.target.name]:e.target.value,
  }))
  }

  const onSubmit = (e) => {
     e.preventDefault()
  }

  return (
    <>
      <section className="heading">
         <h1>
           <FaUser/> Register
         </h1>
         <p>Please create an account</p>
         </section>
         <section className="form">
            <form onSubmit={onSubmit}>
            <div className="form-group">
              <input type="text" className="form-control"
                id="name"  name="name" value={name} 
                placeholder="Enter your name.."
                 onChange={onChange}/>
             </div>
             <div className="form-group">
              <input type="email" className="form-control"
                id="email"  name="email" value={email} 
                placeholder="Enter your email.."
                 onChange={onChange}/>
             </div>
             <div className="form-group">
              <input type="password" className="form-control"
                id="password"  name="password" value={password} 
                placeholder="Enter  password.."
                 onChange={onChange}/>
             </div>
             <div className="form-group">
              <input type="password" className="form-control"
                id="cPassword"  name="cPassword" value={cPassword} 
                placeholder=" Confirm password.."
                 onChange={onChange}/>
             </div>
             <div className="form-group">
                <button type="submit" className="btn btn-block">
                  Submit
                </button>
             </div>
             
            </form>
         </section>
      
    </>
  )
}

export default Register
