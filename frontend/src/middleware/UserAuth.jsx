import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserAuth({ children }) {
  const navigate = useNavigate();
  const token = useSelector((store) => store.auth.user?.token);
  console.log(token);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } 
  }, []);

  if(token){
    return children
  }


}

export default UserAuth;
