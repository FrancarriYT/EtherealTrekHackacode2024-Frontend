import Empleado from "./Empleado";

export async function login(signIn, username, password) {
  const baseUrl = 'http://localhost:8080/api';
  const frontAppUsername = 'front_app';
  const frontAppPassword = '12345';

  const formdata = new FormData();
  formdata.append("username", username);
  formdata.append("password", password);
  formdata.append("grant_type", "password");

  const headers = new Headers();
  headers.append('Authorization', 'Basic ' + btoa(frontAppUsername + ':' + frontAppPassword));
  
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: formdata,
    redirect: "follow"
  };

  try {
    const response = await fetch(baseUrl + "/security/oauth/token", requestOptions);
    if (!response.ok) {
      throw new Error('Error in login.');
    }
    const result = await response.json();
    console.log(result);
    
    if (signIn({
      auth: {
        token: result.access_token,
        type: 'Bearer'
      },
      refresh: result.refresh_token,
      userState: {
        nombre: result.nombre,
        apellido: result.apellido,
        correo: result.correo
      }
    })) {

    }
  } catch (error) {
    console.error(error);
  }
}

export async function loggedEmpleado () {
 return null;
}