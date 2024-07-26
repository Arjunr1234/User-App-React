import React, { useState } from 'react';
import './AdminHome.css';
import { useNavigate } from 'react-router-dom';
import { reset, logout } from '../features/authAdmin/adminSlice';
import { useDispatch } from 'react-redux';

function AdminHeader({ onSearch }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateUser = () => {
    navigate('/createUser');
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/admin');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <div className='admin-dashboard'>
      <header className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="user-info">
          <h5 className="welcome-message">Welcome 'Admin'!</h5>
          <input 
            type="text" 
            placeholder="Search users by name" 
            value={searchTerm} 
            onChange={handleSearchChange} 
            className="search-input" 
          />
          <button className="search-btn" onClick={handleSearchClick}>Search</button>
          <button className="create-btn" onClick={handleCreateUser}>Create User</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>
    </div>
  );
}

export default AdminHeader;
