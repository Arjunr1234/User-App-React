import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { login, reset } from "../features/authUser/authSlice";
import Spinner from "../component/Spinner";
import Header from "../component/Header";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess || user) {
      navigate('/');
      dispatch(reset());
    }
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      setTimeout(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }, 3000);
    } else if (!isValidEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      setTimeout(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }, 3000);
    } else if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      setTimeout(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "",
        }));
      }, 3000);
    } else {
      const userData = {
        email,
        password
      };
      dispatch(login(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
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
                placeholder="Enter your email..."
                onChange={onChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Enter your password..."
                onChange={onChange}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">Submit</button>
              <p className="admin-login-text" onClick={() => navigate('/admin')}>Admin login?</p>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Login;
