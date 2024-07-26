import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import { useDispatch, useSelector } from 'react-redux';
import { blockUser, updateUser } from '../features/authAdmin/adminThunk';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorReset } from '../features/authAdmin/adminSlice';

function AdminHome({ users }) {
  const {token, isError, message} = useSelector((store) => store.admin);
  const [editUserId, setEditUserId] = useState(null); // Track the user being edited
  const [editedUserData, setEditedUserData] = useState({ name: '', phone: '' }); // Track edited name and phone
  const dispatch = useDispatch();
  const message1 = "User Details";

  const handleBlock = (userId) => {
    dispatch(blockUser({ userId, token }));
  };

  useEffect(() => {
     console.log("isError & message: ",isError, message );
     if(isError){

       toast.error(message)
       dispatch(errorReset())
     }
  },[message, isError, dispatch])

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditedUserData({ name: user.name, phone: user.phone });
  };

  const handleSave = () => {
    dispatch(updateUser({ userId: editUserId, name: editedUserData.name, phone: editedUserData.phone, token }));
    setEditUserId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const tableTitle = "Users";

  

  return (
    <div className="admin-dashboard">
      <main className="dashboard-content">
        <div className="message-container">
          <h5 className="dashboard-message">{message1}</h5>
        </div>

        <div className="users-section">
          <div className="user-table-container">
            <h3 className="table-title">{tableTitle}</h3>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Edit</th>
                  <th>Block</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <img
                        src={user && user.image ? `/userImage/${user.image}` : "no image"}
                        alt={user.name}
                        className="user-image"
                      />
                    </td>
                    <td>
                      {editUserId === user._id ? (
                        <input
                          type="text"
                          name="name"
                          value={editedUserData.name}
                          onChange={handleChange}
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      {editUserId === user._id ? (
                        <input
                          type="text"
                          name="phone"
                          value={editedUserData.phone}
                          onChange={handleChange}
                        />
                      ) : (
                        user.phone
                      )}
                    </td>
                    <td>
                      {editUserId === user._id ? (
                        <button className="edit-btn" onClick={handleSave}>
                          Save
                        </button>
                      ) : (
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className={`block-btn ${user.isActive ? 'active' : 'inactive'}`}
                        onClick={() => handleBlock(user._id)}
                      >
                        {user.isActive ? "Block" : "Unblock"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminHome;
