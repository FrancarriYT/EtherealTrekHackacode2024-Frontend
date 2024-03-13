import Empleado from "./Empleado";


const API_BASE_URL = 'http://localhost:8080/api';

export async function searchEmpleados() {
  let url = `${API_BASE_URL}empleado`;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
}

export async function removeEmpleado(id) {
  let url = `${API_BASE_URL}empleado/delete/${id}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function saveEmpleado(empleado) {
    if (!(empleado instanceof Empleado)) {
    throw new Error('Invalid object. Must be an instance of Empleado.');
    }
  let url = `${API_BASE_URL}empleado`;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(empleado),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function searchEmpleado(param) {
  let url = `${API_BASE_URL}empleado/${param}`;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
}
