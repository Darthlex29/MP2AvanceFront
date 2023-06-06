import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import newProyect from "../assets/newProyect.png";
import { createProyecto } from "../Services/ProyectoService";
import { getProyectoID } from "../Services/ProyectoService";

function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { prop1 } = location.state || {};

  const unirmeASala = () => {
    Swal.fire({
      title: "Ingrese los datos de la sala a la que se va a unir",
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
        const proyectoN = document.getElementById("swal-input1").value;
        const codigo = document.getElementById("swal-input2").value;
        const ruta = "3sd24s63d5f4";
        const proyecto = {
          name: proyectoN,
          ruta: ruta,
          codigo: codigo,
        };
        const response = getProyectoID(proyecto);
        response.then((result) => {
          console.log(result);
          if (result.message === "Usuario encontrado") {
            Swal.fire("Proyecto se ha encontrado con éxito");
            navigate("/draw", {
              state: { prop1: prop1, prop2: proyectoN, prop3: codigo },
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "No se puede encontrar el proyecto",
              text: "Revisa los datos ingresados ",
            });
          }
        });
      }
    });
  };

  const unirmeAlert = () => {
    Swal.fire({
      title: "Ingresa el codigo de la reunión",
      input: "text",
      inputLabel: "Codigo",
      inputPlaceholder: "Ingresa el codigo",
    }).then((res) => {
      if (res) {
        console.log(res);
        Swal.fire(`Codigo ingresado: ${res.value}`);
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
        const proyectoN = document.getElementById("swal-input1").value;
        const codigo = document.getElementById("swal-input2").value;
        const ruta = "3sd24s63d5f4";
        const proyecto = {
          name: proyectoN,
          ruta: ruta,
          codigo: codigo,
        };
        const response = createProyecto(proyecto);
        response.then((result) => {
          console.log(result);
          if (result.message === "Success") {
            Swal.fire("Proyecto creado con éxito", "", "success");
            navigate("/draw", {
              state: { prop1: prop1, prop2: proyectoN, prop3: codigo },
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "No se puede crear el registro",
              text: "Revisa los datos ingresados ",
            });
          }
        });
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
