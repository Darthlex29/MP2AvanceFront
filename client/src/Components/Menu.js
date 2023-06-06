import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import newProyect from "../assets/newProyect.png";
import { createProyecto } from "../Services/ProyectoService";
import { getProyectoID } from "../Services/ProyectoService";
import {
  createConjunto,
  getConjuntoProyecto,
  getConjuntos,
} from "../Services/ConjuntoService";

function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { prop1, prop2, prop3 } = location.state || {};

  const unirmeAlert = () => {
    Swal.fire({
      title: "Ingresa el codigo de la reunión",
      input: "text",
      inputLabel: "Codigo",
      inputPlaceholder: "Ingresa el codigo",
    }).then((res) => {
      if (res) {
        try {
          console.log(res.value);
          const sala = {
            codigo: res.value,
          };
          const response = getProyectoID(sala);
          response.then((result1) => {
            console.log(result1);
            if (result1.message === "Usuario encontrado") {
              const salaConjunto = {
                proyecto: res.value,
              };
              const response3 = getConjuntoProyecto(salaConjunto);
              let rol = "1";
              response3.then((result) => {
                console.log(result);
                for (let i = 0; i < result.conjuntos.length; i++) {
                  console.log(result.conjuntos[i].usuario +" = "+prop2)
                  if (result.conjuntos[i].usuario === prop2) {
                    console.log(result.conjuntos[i].usuario);
                    rol = result.conjuntos[i].rol;
                    
                    navigate("/draw", {
                      state: {
                        prop1: prop1,
                        prop2: result.name,
                        prop3: result1.id,
                        prop4: rol,
                      },
                    });
                  }
                }
              });
              Swal.fire("Proyecto se ha encontrado con éxito");
            } else {
              Swal.fire({
                icon: "error",
                title: "No se puede encontrar el proyecto",
                text: "Revisa los datos ingresados ",
              });
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const crearProyecto = () => {
    Swal.fire({
      title: "Datos del proyecto",
      html:
        "<p>Ingresa el nombre del proyecto</p>" +
        '<input id="swal-input1" class="swal2-input">' +
        "<p>Ingresa el código del proyecto</p>" +
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    }).then((formValues) => {
      if (formValues) {
        let proyectoCreado = false;
        const proyectoN = document.getElementById("swal-input1").value;
        const codigo = document.getElementById("swal-input2").value;
        const ruta = "3sd24s63d5f4";
        const proyecto = {
          name: proyectoN,
          ruta: ruta,
          codigo: codigo,
        };
        const conjunto = {
          proyecto: codigo,
          usuario: prop2,
          rol: "1",
        };
        const response1 = createProyecto(proyecto);
        response1.then((result) => {
          console.log(result);
          if (result.message === "Success") {
            const response2 = createConjunto(conjunto);
            response2.then((result) => {
              console.log(result);
              if (result.message === "Success") {
                Swal.fire(
                  "Proyecto creado con éxito, se ha enviado una invitacion a tu correo.",
                  "",
                  "success"
                );
                navigate("/draw", {
                  state: { prop1: prop1, prop2: proyectoN, prop3: codigo },
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "No se puede crear el conjunto",
                  text: "Revisa los datos ingresados.",
                });
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "No se puede crear el registro",
              text: "Revisa los datos ingresados ",
            });
          }
        });

        /* const response2 = createConjunto(conjunto);
        response2.then((result) => {
          console.log(result);
          if (result.message === "Success") {
            proyectoCreado = true;
          } else {
            proyectoCreado = false;
          }
        }); */
        if (proyectoCreado === true) {
        } else {
        }
      }
    });
  };

  return (
    <div className="Menu">
      <header>
        <div>
          <h3>{prop1}</h3>
        </div>
        <div>
          <button className="btnUnirme" onClick={() => unirmeAlert()}>
            unirme
          </button>
          <button className="btnCerrarsesion" onClick={() => navigate("/")}>
            Cerrar sesion
          </button>
        </div>
      </header>
      <section>
        {/* <div className="fotos">
          <div className="foto">
            <p>foto</p>
          </div>
          <div className="foto">
            <p>foto</p>
          </div>
          <div className="foto">
            <p>foto</p>
          </div>
        </div> */}
        <div className="newProyect">
          <button onClick={() => crearProyecto()}>
            <img src={newProyect} width={window.innerWidth * 0.55}></img>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Menu;
