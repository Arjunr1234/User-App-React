import React, { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../features/authAdmin/adminThunk';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.admin.userData);
    const isSuccess = useSelector((store) => store.admin.isSuccess)
    
    const { email, password } = formData;

    useEffect(() => {
      console.log("Thsi is the user data in login Page: ", userData);
      console.log("This is isSuccess: ", isSuccess)
      if(isSuccess){
        navigate('/admin/home')
      }
    },[userData])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        console.log('Form submitted', formData);
        dispatch(adminLogin({email, password}))
    };

    return (
        <>
            
            <h1 style={{textAlign: 'center', background: 'black', padding: '20px', color: 'white', borderBottom: '2px solid red'}}> Admin Login</h1>

            <div className="container">
              
                <section className="heading">
                    <h1><FaSignInAlt /> Login</h1>
                    <p>Login Here...</p>
                </section>
                <section className="form">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                placeholder="Enter your email.."
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                placeholder="Enter your password.."
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-block">
                                Submit
                            </button>
                        </div>
                         <p className='admin-login-text' onClick={() => navigate('/login')}>user login ?</p>
                    </form>
                </section>
            </div>
        </>
    );
}

export default AdminLogin;
