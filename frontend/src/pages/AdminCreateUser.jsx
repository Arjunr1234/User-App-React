import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import './AdminCreateUser.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../features/authAdmin/adminThunk';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminCreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store) => store.admin.token);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    cPassword: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    phone: '',
  });

  const { name, email, phone, password, cPassword } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
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

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Passwords do not match',
      }));
      setTimeout(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: '',
        }));
      }, 3000);
    } else if (!isValidPassword(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 8 characters long and contain both letters and digits',
      }));
      setTimeout(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: '',
        }));
      }, 3000);
    } else if (!isValidPhone(phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: 'Please enter a valid 10-digit phone number',
      }));
      setTimeout(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: '',
        }));
      }, 3000);
    } else {
      try {
        await dispatch(createUser({ userData, token })).unwrap();
        navigate('/admin/home');
        toast.success('User created successfully!');
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const handleCancel = () => {
    navigate('/admin/home');
  };

  return (
    <div className="create-user-page">
     
      <h2 className="create-user-title">Create New User</h2>
      <form className="create-user-form" onSubmit={onSubmit}>
        <input
          className="create-user-input"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter name"
          required
        />
        <input
          className="create-user-input"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
          type="email"
        />
        <input
          className="create-user-input"
          name="phone"
          value={phone}
          onChange={handleChange}
          placeholder="Enter Phone number"
          required
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}
        <input
          className="create-user-input"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          required
          type="password"
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
        <input
          className="create-user-input"
          name="cPassword"
          value={cPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          type="password"
        />
        <div className="create-user-button-group">
          <button className="create-user-submit" type="submit">
            Create User
          </button>
          <button className="create-user-cancel" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AdminCreateUser;
