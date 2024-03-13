import Empleado from "./Empleado";

const baseUrl = 'http://localhost:8080/api';

export async function login(username, password) {
  const frontAppUsername = 'front_app';
  const frontAppPassword = '12345';

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Basic ${btoa(`${frontAppUsername}:${frontAppPassword}`)}`);

  const formdata = new FormData();
  formdata.append('username', username);
  formdata.append('password', password);
  formdata.append('grant_type', 'password');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  try {
    const response = await fetch(`${baseUrl}/security/oauth/token`, requestOptions);

    if (!response.ok) {
      throw new Error('Error en el login.');
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}
