const BASE_URL = "http://localhost:3005/";

async function getAllUsers() {
  try {
    const response = await fetch(`${BASE_URL}read-usuario`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function loginUsuario(user) {
  try {
    const response = await fetch(`${BASE_URL}login-usuario`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function getUserID(user) {
  try {
    const response = await fetch(`${BASE_URL}consultar-usuario-id`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function createUser(user) {
  try {
    const response = await fetch(`${BASE_URL}add-usuario`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
/* 
async function deleteUser(id) {
  try {
    const response = await fetch(`${BASE_URL}${id}`, { method: "DELETE" });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
} */

export { getAllUsers, getUserID, loginUsuario, createUser };
