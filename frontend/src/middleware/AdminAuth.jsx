import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminAuth({children}) {
    const navigate = useNavigate();
    const token = useSelector((store) => store.admin?.token);
    console.log(token,': Token');
  

    useEffect(() => {
      if (!token) {
        navigate("/admin");
      } 
    }, []);
  
    if(token){
      return children
    }
}

export default AdminAuth