import React, { useState } from "react";
import { Login } from "./Login";
import { Registro } from "./Registro";

function AuthApp() {
  const [currentForm, setCurrentForm] = useState("Login");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="Loggeo">
      {currentForm === "Login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Registro onFormSwitch={toggleForm} />
      )}
    </div>
  );
}

export default AuthApp;
