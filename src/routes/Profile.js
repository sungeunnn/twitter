import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbase";
const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(authService);
    navigate("/", { replace: true });
  };
  return (
    <>
      <button onClick={onLogOutClick}>Logout</button>
    </>
  );
};

export default Profile;
