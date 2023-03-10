import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";
import { updateProfile } from "@firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
    if(user) {
    setUserObj(user);
    if(user.displayName === null){
    const name = user.email.split("@")[0];
    updateProfile(userObj, { displayName: name });
    }
    }
    setInit(true);
    });
    }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}

    </>
  );
}

export default App;
