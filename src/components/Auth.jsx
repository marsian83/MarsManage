import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import NavbarComponent from "./NavbarComponent";

export default function Auth() {
  const [userState, setUserState] = useState('login');

  return (
    <>
      {userState == "signup" ? (
        <Signup changeState={setUserState} />
      ) : (
        userState == "login" && <Login changeState={setUserState} />
      )}
    </>
  );
}
