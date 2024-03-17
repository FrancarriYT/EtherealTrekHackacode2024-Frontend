import Cookies from 'js-cookie'; // Assuming you're using js-cookie library

export async function getAllEmpleados() {
    const myBearerToken = Cookies.get('_auth'); // Retrieve the Bearer token from the cookie
    if (!myBearerToken) {
        console.log('No token found in the cookie.');
        return []; // Return an empty array if no token found
    }

    console.log("Se obtuvo el Token de acceso por parte de las cookies, ejecutando importe de información de empleado.");

    const baseUrl = 'http://localhost:8080/api/';
    const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
            "Authorization": `Bearer ${myBearerToken}` // Include Bearer token in headers
        }
    };

    try {
        const response = await fetch(baseUrl + "usuarios/empleados", requestOptions);
        if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos de empleados.');
        }
        
        const result = await response.json();
        console.log(result); // Log the employee data to console
        
        return result; // Return the data for further usage
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}

