const BASE_URL = "http://localhost:3005/conjunto/";

async function getConjuntoUsuario() {
  try {
    const response = await fetch(`${BASE_URL}consultar-conjunto-usuario`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function getConjuntoProyecto(conjunto) {
  try {
    const response = await fetch(`${BASE_URL}consultar-conjunto-proyecto`, {
      method: "POST",
      body: JSON.stringify(conjunto),
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function getConjuntos() {
  try {
    const response = await fetch(`${BASE_URL}read-conjunto`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function createConjunto(Conjunto) {
  try {
    const response = await fetch(`${BASE_URL}add-conjunto`, {
      method: "POST",
      body: JSON.stringify(Conjunto),
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export {
  getConjuntos,
  getConjuntoProyecto,
  getConjuntoUsuario,
  createConjunto,
};
