

const API_BASE_URL = process.env.REACT_APP_API || 'http://35.199.79.183/auth/';

export async function searchUsuarios() {
  let url = `${API_BASE_URL}usuario/get/all`;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
}

export async function removeUsuario(id) {
  let url = `${API_BASE_URL}usuario/delete/${id}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function saveUsuario(usuario) {
  let url = `${API_BASE_URL}usuario/create`;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(usuario),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function searchUsuarioById(id) {
  let url = `${API_BASE_URL}usuario/getById/${id}`;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
}
