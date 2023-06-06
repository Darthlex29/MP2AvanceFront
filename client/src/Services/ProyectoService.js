const BASE_URL = "http://localhost:3005/proyecto/";

async function getProyectos() {
    try {
      const response = await fetch(`${BASE_URL}read-proyecto`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function createProyecto(proyecto) {
    try {
      const response = await fetch(`${BASE_URL}add-proyecto`, {
        method: "POST",
        body: JSON.stringify(proyecto),
        headers: { "Content-Type": "application/json" },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function getProyectoID(proyecto) {
    try {
      const response = await fetch(`${BASE_URL}consultar-proyecto-id`, {
        method: "POST",
        body: JSON.stringify(proyecto),
        headers: { "Content-Type": "application/json" },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  export { createProyecto, getProyectoID, getProyectos };
