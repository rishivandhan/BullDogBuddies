import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []);

  function handleLogout() {
    try {
      localStorage.removeItem("currentUserId");
      alert("Logout Successfull");
      navigate("/");
    } catch {
      console.log("not working");
    }
  }
}

export default SignOut;
