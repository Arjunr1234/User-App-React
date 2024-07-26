import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AdminHome from '../../pages/AdminHome';
import AdminHeader from '../../pages/AdminHeader';

function Admin() {
  const users = useSelector((store) => store.admin.userData) || [];
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <div>
      <AdminHeader onSearch={handleSearch} />
      <AdminHome users={filteredUsers} />
    </div>
  );
}

export default Admin;
