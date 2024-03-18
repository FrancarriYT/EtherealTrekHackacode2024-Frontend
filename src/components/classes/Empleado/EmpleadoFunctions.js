import Cookies from 'js-cookie'; // Assuming you're using js-cookie library
const baseUrl = 'http://localhost:8080/api/';
export async function getAllEmpleados() {
    const myBearerToken = Cookies.get('_auth'); // Retrieve the Bearer token from the cookie
    if (!myBearerToken) {
        console.log('No token found in the cookie.');
        return []; // Return an empty array if no token found
    }

    console.log("Se obtuvo el Token de acceso por parte de las cookies, ejecutando importe de información de empleado.");


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

export async function createEmpleado(empleadoData) {
    const myBearerToken = Cookies.get('_auth');
    if (!myBearerToken) {
        console.log('No token found in the cookie.');
        return { success: false, message: 'No token found in the cookie.' };
    }

    console.log("Se obtuvo el Token de acceso por parte de las cookies, ejecutando importe de información de empleado.");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Authorization": `Bearer ${myBearerToken}`
        },
        body: JSON.stringify(empleadoData),
        redirect: "follow"
    };

    try {
        const response = await fetch(baseUrl + "usuarios/auth/empleado", requestOptions);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Hubo un problema al crear el empleado.');
        }

        console.log("Empleado creado exitosamente:", result);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al crear el empleado. Inténtelo de nuevo más tarde.' };
    }
}
