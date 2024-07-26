import React, { useEffect, useState } from 'react';
import './profile.css';
import defaultImg from '../images/profilePic.jpg';
import { FaEdit, FaCamera } from 'react-icons/fa'; 
import { useDispatch, useSelector } from 'react-redux';
import { addImage, editUserProfile } from '../features/authUser/authSlice';

function Profile({ user }) {
  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(false);
  const {token} = useSelector((store) => store.auth.user)
  

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name:user?.name || "",
    phone:user?.phone || "",
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }

 const handleSave = () => {
    const userData = {
      userId:user._id,
      formData,
      token
    }
     dispatch(editUserProfile(userData))
     setEdit(false)
 }

  useEffect(() => {
    if (image ) {
      dispatch(addImage({ image, userId: user._id,token }));
      setImage(null)
    }
  }, [image, user]);

  return (
    <>
      <div className="container-profile">
        <div className="profile-box">
          <div className="photo-container">
            <div className="photo">
              <img 
                src={user && user.image ? `/userImage/${user.image}` : defaultImg} 
                className='profile-pic' 
                alt="Profile" 
              />
            </div>
            <input
              type="file"
              id="file-input"
              style={{ display: 'none' }}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <FaCamera className="add-photo-icon" onClick={() => document.getElementById('file-input').click()} />
          </div>
          <div className="profile-edit">
            <FaEdit className="edit-icon" onClick={() => setEdit(true)} />
          </div>
          
          
          {edit === false ? (
            <div className="profile-data common-container">
              <h3>{user && user.name ? user.name : "Guest User"}</h3>
              <p>{user && user.email ? user.email : "No email"}</p>
              <p>{user && user.phone ? user.phone : "No Phone"}</p>
            </div>
          ) : (
            <div className="profile-data common-container">
              <div className="form-container">
                <label htmlFor="name">Name: </label>
                <input type="text" className="input-field" id="name"
                 name="name" value={formData? formData.name:""}
                 onChange={handleInputChange} />
                <br />
                <label htmlFor="phone">Phone: </label>
                <input type="text" className="input-field" id="phone" name="phone"
                 value={formData.phone? formData.phone: "No data"}
                 onChange={handleInputChange} />
                <br />
                <button className="btn-cancel cancel-btn" onClick={() => setEdit(false)}>Cancel</button>
                <button className="btn-save save-btn" onClick={handleSave}>Save</button>
              </div>
            </div>
          )}



        </div>
      </div>
    </>
  );
}

export default Profile;
