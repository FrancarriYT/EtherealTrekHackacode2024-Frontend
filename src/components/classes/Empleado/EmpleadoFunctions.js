import Cookies from 'js-cookie'; 
const baseUrl = 'http://localhost:8080/api/';


export async function getAllEmpleados() {
    const myBearerToken = Cookies.get('_auth'); // Recuperar infomación del Token
    if (!myBearerToken) {
        console.log('No token found in the cookie.');
        return []; //Devuelve un array vacio si no se encuentra el Token.
    }

    console.log("Se obtuvo el Token de acceso por parte de las cookies, ejecutando importe de información de empleado.");


    const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
            "Authorization": `Bearer ${myBearerToken}` 
        }
    };

    try {
        const response = await fetch(baseUrl + "usuarios/empleados", requestOptions);
        if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos de empleados.');
        }
        
        const result = await response.json();
        console.log(result); // Loguea en la consola el resultado de los datos
        
        return result; // Tetorna los datos para uso posterior
    } catch (error) {
        console.error(error);
        return []; // Retornar Array vacio en caso de error.
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
export async function editEmpleado(empleadoData, email) {
    const myBearerToken = Cookies.get('_auth');
    if (!myBearerToken) {
      console.log('No token found in the cookie.');
      return { success: false, message: 'No token found in the cookie.' };
    }
    
    console.log("Se obtuvo el Token de acceso por parte de las cookies, ejecutando importe de información de empleado.");
    console.log("ID: ", email);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Authorization": `Bearer ${myBearerToken}`
      },
      body: JSON.stringify(empleadoData),
      redirect: "follow"
    };

    try {

      const response = await fetch(baseUrl + `usuarios/empleados/${email}`, requestOptions); // Replace "<string>" with the employee ID
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Hubo un problema al editar el empleado.');
      }
  
      console.log("Empleado editado exitosamente:", result);
      return { success: true, data: result };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error al editar el empleado. Inténtelo de nuevo más tarde.' };
    }
  }

export async function getEmpleado(email) {
    const myBearerToken = Cookies.get('_auth');
    if (!myBearerToken) {
        console.log('No token found in the cookie.');
        return { success: false, message: 'No token found in the cookie.' };
    }

    console.log("Se obtuvo el Token de acceso por parte de las cookies, obteniendo información del empleado.");

    const requestOptions = {
        method: "GET",
        headers: {
            "Accept": "*/*",
            "Authorization": `Bearer ${myBearerToken}`
        },
        redirect: "follow"
    };

    try {
        const response = await fetch(`${baseUrl}usuarios/empleados/${email}`, requestOptions);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching empleado data:", error);
        return { success: false, message: 'Error fetching empleado data.' };
    }
}

export async function onDeleteFunction(email) {
  try {
    await removeEmpleado(email);
    console.log('Empleado eliminado exitosamente.');
  } catch (error) {
    console.error('Error eliminando empleado:', error);
  }
}


  
  export async function removeEmpleado(email) {
    try {
      const myBearerToken = Cookies.get('_auth');
      if (!myBearerToken) {
        console.log('No se encontró token en las cookies.');
        return { success: false, message: 'No se encontró token en las cookies.' };
      }
  
      console.log('Se obtuvo el Token de acceso por parte de las cookies, obteniendo información para borrar al empleado.');
  
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${myBearerToken}`);
  
      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      const response = await fetch(`${baseUrl}usuarios/empleados/${email}`, requestOptions);
  
      if (!response.ok) {
        // Si la respuesta no fue exitosa, arrojamos un error con el código de respuesta
        throw new Error(`Error eliminando empleado: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Empleado eliminado de email:', email);
      return data;
    } catch (error) {
      console.error('Error eliminando empleado:', error);
      return { success: false, message: 'Error al eliminar empleado.' };
    }
  }
  

  