import Mensajero from "./Mensajero";
import Paint from "./Paint";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function Draw() {
  const location = useLocation();
  const { prop1, prop2, prop3 } = location.state || {};
  const navigate = useNavigate();

  const unirmeAlert = () => {
    Swal.fire({
      title: "Escribe tu correo",
      input: "email",
      inputLabel: "Tu direccion de correo",
      inputPlaceholder: "Ingresa tu direccion de correo",
    }).then((respuesta) => {
      Swal.fire({
        title: "Seleccionar Rol",
        input: "select",
        inputOptions: {
          Administrador: "Administrador",
          Dibujante: "Dibujante",
          Observador: "Observador",
        },
      }).then((respuesta) => {
        console.log(respuesta.value);
      });
      console.log(respuesta.value);
    });
  };

  return (
    <div className="Draw">
      <section>
        <h1>Nombre de la sala: {prop2} Codigo de la sala: {prop3}</h1>
        <button className="btnInvitar" onClick={() => unirmeAlert()}>
          invitar
        </button>
        <button className="btnCerrarsesion" onClick={() => navigate("/")}>
          Cerrar sesion
        </button>
      </section>
      <Paint
        width={window.innerWidth * 0.6}
        height={window.innerHeight * 0.6}
        name = {prop1}
      />
      <Mensajero />
    </div>
  );
}

export default Draw;
