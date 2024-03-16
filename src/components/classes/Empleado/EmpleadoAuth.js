import Empleado from "./Empleado";
import Cookies from 'js-cookie';
import { AuthError } from 'react-auth-kit/errors';
const baseUrl = 'http://localhost:8080/api';
export async function login(signIn, username, password) {

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
        correo: result.correo
      }
    })) {

    }
  } catch (error) {
    console.error(error);
  }
}



export async function loggedEmpleado() {
  let empleado = new Empleado(); // Instantiate a new Empleado object
  
  try {
    const authStateCookie = Cookies.get('_auth_state'); // Get the _auth_state cookie
    if (!authStateCookie) {
      throw new Error('No authentication state found in the cookie.');
    }
    
    const authState = JSON.parse(authStateCookie); // Parse the JSON stored in the cookie
    console.log(authState);
    const correo = authState.correo; // Extract the correo value

    const myBearerToken = Cookies.get('_auth'); // Assuming your token is stored in a cookie named '_auth_type'
    if (!myBearerToken) {
      throw new Error('No token found in the cookie.');
    }
    console.log("Se obtuvo el Token de acceso por parte de las cookies, ejecutando importe de información de empleado.");

    const myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Authorization", `Bearer ${myBearerToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(baseUrl + `/usuarios/empleados/${correo}`, requestOptions);

    if (!response.ok) {
      // Handle server errors
      let errorMessage = "Error during importing data after successful Login.";
      if (response.status === 401) {
        errorMessage = "Unauthorized. Please login again.";
      } else if (response.status === 403) {
        errorMessage = "Forbidden. You don't have permission to access this resource.";
      }
      throw new AuthError(errorMessage); // Using AuthError for authentication-related errors
    }

    const result = await response.json();
    console.log(result);

    empleado.nombre = result.nombre;
    empleado.apellido = result.apellido;
    empleado.dni = result.dni;
    empleado.fechaNac = result.fechaNac;
    empleado.pais = result.pais;
    empleado.celular = result.celular;
    empleado.correo = result.correo;
    empleado.cargo = result.cargo;
    empleado.sueldo = result.sueldo;

    return empleado;
  } catch (error) {
    // Handle errors
    console.error("An unexpected error occurred:", error.message);
    throw error;
  }
}


