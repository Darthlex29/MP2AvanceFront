const BASE_URL = "http://localhost:3005/";

async function getConjuntoUsuario() {
  try {
    const response = await fetch(`${BASE_URL}consultar-conjunto-usuario`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function getConjuntoProyecto() {
    try {
      const response = await fetch(`${BASE_URL}consultar-conjunto-usuario`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function getConjunto() {
    try {
      const response = await fetch(`${BASE_URL}consultar-conjunto-usuario`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function createConjunto(Conjunto) {
    try {
      const response = await fetch(`${BASE_URL}add-usuario`, {
        method: "POST",
        body: JSON.stringify(Conjunto),
        headers: { "Content-Type": "application/json" },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  
  export { getConjunto, getConjuntoProyecto, getConjuntoUsuario, createConjunto };
