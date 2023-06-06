import React, { useState/* , useContext */ } from "react";
import { useNavigate } from "react-router-dom";
import {loginUsuario} from "../Services/UsuarioService";
import Swal from "sweetalert2";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const controlEmail = (e) => {
    setEmail(e.target.value);
  };

  const controlContrasena = (e) => {
    setContrasena(e.target.value);
  };

  const handleSubmit = (e) => {
    const usuario = {
      email: email,
      pss: contrasena
    };
    const usuarioValidado = loginUsuario(usuario);
    usuarioValidado.then((result) => {
      console.log(result);
      if(result.message === "Usuario encontrado"){
        navigate("/menu", { state: { prop1: result.name, prop2: usuario.email, prop3: usuario.pss} })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Usuario no encontrado',
          text: 'Revisa tu correo o contraseña ',
        })
      }
    });
  };


  return (
    <div className="contenedor-login-auth">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">email: </label>
        <input
          type="email"
          value={email} // Usar value en lugar de onChange para vincular el estado con el input
          onChange={controlEmail}
          placeholder="tucorreo@email.com"
        />

        <label htmlFor="contrasena">contraseña: </label>
        <input
          type="password" // Cambiar el tipo de input a "password" para ocultar la contraseña
          value={contrasena} // Usar value en lugar de onChange para vincular el estado con el input
          onChange={controlContrasena}
          placeholder="************"
        />
        <button
          className="btnIngreso"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit()
          }}
        >
          Ingresar
        </button>
      </form>
      <button
        className="Linkbtn"
        onClick={() => props.onFormSwitch("Registro")}
      >
        ¿No tienes una cuenta? Regístrate aquí
      </button>
    </div>
  );
};
