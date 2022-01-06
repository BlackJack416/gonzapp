import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Redirect } from "react-router";

//CONTEXT:
import { AuthContext } from "../../context/AuthContext";

const SignUp = () => {
  const { signup, logged, error } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    signup(email, password);
  };

  return (
  <div className="white-container-full">
      {logged ?
        (<Redirect to={"/"} />)
        : (
    
          <form className="form" onSubmit={handleSignup}>
            <h5 className="title">Registrarme</h5>
            <span className="form-span">Email</span>
            <input
              type="text"
              className="form-input"
              id="email-signup"
              name="email-singup"
              onChange={(e) => setEmail(e.target.value)}
            />
            {error === "auth/email-already-in-use" && (
              <p className="form-message form-message-error">
                Usuario ya registrado
              </p>
            )}
            {error === "auth/invalid-email" && (
              <p className="form-message form-message-error">
                Ingrese un email válido
              </p>
            )}
            <span className="form-span">Contaseña</span>
            <input
              type="password"
              className="form-input"
              id="password-signup"
              name="password-singup"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error === "auth/weak-password" && (
              <p className="form-message form-message-error">
                La contraseña debe contener más de 6 caracteres
              </p>
            )}
            <input
              type="submit"
              value="Enviar"
              className="btn-login btn-container-violet"
            />
          </form>
        )}
    </div>
    
  );
};

export default SignUp;