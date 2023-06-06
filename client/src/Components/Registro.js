import React, { useState } from "react";
import { createUser } from "../Services/UsuarioService";
import Swal from "sweetalert2";

export const Registro = (props) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const controlEmail = (e) => {
    setEmail(e.target.value); // Utilizar e.target.value para obtener el valor del input
  };

  const controlContrasena = (e) => {
    setContrasena(e.target.value); // Utilizar e.target.value para obtener el valor del input
  };

  const controlNombre = (e) => {
    setNombre(e.target.value); // Utilizar e.target.value para obtener el valor del input
  };

  const handleSubmit = (e) => {
    console.log("Se realizó el envío");
    console.log(
      "El valor guardado en tu estado es: " +
        nombre +
        ", " +
        email +
        ", " +
        contrasena
    );

    const usuario = {
      name: nombre,
      email: email,
      pss: contrasena,
    };

    console.log(usuario.pss);
    const response = createUser(usuario);
    response.then((result) => {
      console.log(result);
      if (result.message === "Success") {
        Swal.fire(
          'Usuario registrado con éxito',
          '',
          'success'
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "No se puede realizar el registro",
          text: "Revisa los datos ingresados ",
        });
      }
    });
  };

  return (
    <div className="contenedor-registro-auth">
      <h1>Registro</h1>
      <form className="registro-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">nombre completo: </label>
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          value={nombre} // Usar value en lugar de onChange para vincular el estado con el input
          onChange={controlNombre}
        />

        <label htmlFor="email">email: </label>
        <input
          type="email"
          placeholder="tucorreo@email.com"
          value={email} // Usar value en lugar de onChange para vincular el estado con el input
          onChange={controlEmail}
        />

        <label htmlFor="contrasena">contraseña: </label>
        <input
          type="password"
          value={contrasena} // Usar value en lugar de onChange para vincular el estado con el input
          onChange={controlContrasena}
          placeholder="************"
        />
        <button
          className="btnRegistro"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Registrarse
        </button>
      </form>
      <button className="Linkbtn" onClick={() => props.onFormSwitch("Login")}>
        ¿Ya tienes una cuenta? Ingresa aquí
      </button>
    </div>
  );
};
