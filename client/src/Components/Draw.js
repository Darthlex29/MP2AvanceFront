import { createConjunto } from "../Services/ConjuntoService";
import Mensajero from "./Mensajero";
import Paint from "./Paint";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function Draw() {
  const location = useLocation();
  const { prop1, prop2, prop3, prop4 } = location.state || {};
  const navigate = useNavigate();

  let admin = (prop4 === "1" /* || prop4 === "2" */) ? true:false;
/*   let observador = (prop4 === "3") ? false:true; */

  const unirmeAlert = () => {
    Swal.fire({
      title: "Escribe tu correo",
      input: "email",
      inputLabel: "Tu direccion de correo",
      inputPlaceholder: "Ingresa tu direccion de correo",
    }).then((respuesta1) => {
      Swal.fire({
        title: "Seleccionar Rol",
        input: "select",
        inputOptions: {
          Administrador: "Administrador",
          Dibujante: "Dibujante",
          Observador: "Observador",
        },
      }).then((respuesta) => {
         if (respuesta) {
          console.log(respuesta) 
          switch (respuesta.value) {
            case "Administrador":
              respuesta.value = "1";
              break;
            case "Dibujante":
              respuesta.value = "2";
              break;
            case "Observador":
              respuesta.value = "3";
              break;
            default:
              respuesta.valua = "2";
              break;
          }
  
          const conjunto = {
            proyecto: prop3,
            usuario: respuesta1.value,
            rol: respuesta.value,
          };
          console.log(conjunto)
          const response2 = createConjunto(conjunto);
            response2.then((result) => {
              console.log(result);
              if (result.message === "Success") {
                Swal.fire(
                  "Se ha enviado una invitacion a tu correo.",
                  "",
                  "success"
                );
              } else {
                Swal.fire({
                  icon: "error",
                  title: "No se puede crear el conjunto",
                  text: "Revisa los datos ingresados.",
                });
              }
            });
        }
      });
      console.log(respuesta1.value);
    });
  };

  return (
    <div className="Draw">
      <section>
        <h1>
          Nombre de la sala: {prop2} Codigo de la sala: {prop3}
        </h1>
        {admin && <button className="btnInvitar" onClick={() => unirmeAlert()}>
          invitar
        </button>}
        <button className="btnCerrarsesion" onClick={() => navigate("/")}>
          Cerrar sesion
        </button>
      </section>
      <Paint
        width={window.innerWidth * 0.6}
        height={window.innerHeight * 0.6}
        name={prop1}
        codigo={prop3}
        /* rol = {observador} */
      />
      <Mensajero codigo={prop3} />
    </div>
  );
}

export default Draw;
