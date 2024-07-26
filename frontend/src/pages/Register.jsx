import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/authUser/authSlice";
import Spinner from "../component/Spinner";
import Header from "../component/Header";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    phone: "",
  });

  const { name, email, password, cPassword, phone } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);

      setTimeout(() => {
        setErrors({
          name: "",
          email: "",
          password: "",
          cPassword: "",
          phone: "",
        });
      }, 3000);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isValidPhone = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required and should not be empty or just spaces",
      }));
      hasError = true;
    }

    if (!email || !isValidEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Valid email is required",
      }));
      hasError = true;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      hasError = true;
    } else if (password !== cPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Passwords do not match",
      }));
      hasError = true;
    } else if (!isValidPassword(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long and contain both letters and digits",
      }));
      hasError = true;
    }

    if (!phone || !isValidPhone(phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid 10-digit phone number",
      }));
      hasError = true;
    }

    if (hasError) {
      setTimeout(() => {
        setErrors({
          name: "",
          email: "",
          password: "",
          cPassword: "",
          phone: "",
        });
      }, 3000);
      return;
    }

    const userData = {
      name,
      email,
      password,
      phone,
    };
    dispatch(register(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name.."
              onChange={onChange}
            />
            {errors.name && (
              <p className="error-message">{errors.name}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email.."
              onChange={onChange}
            />
            {errors.email && (
              <p className="error-message">{errors.email}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={phone}
              placeholder="Enter your phone number.."
              onChange={onChange}
            />
            {errors.phone && (
              <p className="error-message">{errors.phone}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password.."
              onChange={onChange}
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="cPassword"
              name="cPassword"
              value={cPassword}
              placeholder="Confirm password.."
              onChange={onChange}
            />
            {errors.cPassword && (
              <p className="error-message">{errors.cPassword}</p>
            )}
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
