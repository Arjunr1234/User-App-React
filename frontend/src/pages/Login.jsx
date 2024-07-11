import { useState } from "react"
import { FaSignInAlt } from "react-icons/fa"

function Login() {

   const [formData, setFromData] = useState({
    email:"",
    password:""
   })
   const {email, password} = formData;

   const onChange = (e) => {
         setFromData((prevState) => ({
          ...prevState,
          [e.target.name]:e.target.value
         }))
   }

   const onSubmit = (e) => {
      e.preventDefault()
   }
  return (
    <>
      <div className="container">
           <section className="heading">
              <h1>  <FaSignInAlt/> Login</h1>
              <p>Login Here...</p>
           </section>
           <section className="form" >
              <form onSubmit={onSubmit}>
              <div className="form-group">
                   <label htmlFor="">Email</label>
                   <input type="email" name="email" id="email"
                   value={email} placeholder="Enter you email.." onChange={onChange}/>
               </div>
               <div className="form-group">
                   <label htmlFor="">Password</label>
                   <input type="password" name="password" id="password"
                   value={password} placeholder="Enter you password.." onChange={onChange}/>
               </div>
               <div className="form-group">
                <button type="submit" className="btn btn-block">
                  Submit
                </button>
             </div>
              </form>
           </section>
      </div>
       
    </>
  )
}

export default Login
