import Cookies from 'js-cookie'; 
const baseUrl = 'http://localhost:8080/api/services';


export async function getAllServicios() {
    const myBearerToken = Cookies.get('_auth'); // Recuperar infomación del Token
    if (!myBearerToken) {
        console.log('No token found in the cookie.');
        return []; //Devuelve un array vacio si no se encuentra el Token.
    }

    console.log("Se obtuvo el Token de acceso por parte de las cookies, ejecutando importe de información de servicio.");


    const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
            "Authorization": `Bearer ${myBearerToken}` 
        }
    };

    try {
        const response = await fetch(baseUrl + "/servicios", requestOptions);
        if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos de servicios.');
        }
        
        const result = await response.json();
        console.log(result); // Loguea en la consola el resultado de los datos
        
        return result; // Tetorna los datos para uso posterior
    } catch (error) {
        console.error(error);
        return []; // Retornar Array vacio en caso de error.
    }
}
export async function filtrarServiciosPorTipo(tipo) {
  const myBearerToken = Cookies.get('_auth'); // Recuperar información del Token
  if (!myBearerToken) {
      console.log('No token found in the cookie.');
      return []; // Devuelve un array vacío si no se encuentra el Token.
  }

  console.log("Se obtuvo el Token de acceso por parte de las cookies, filtrando información de servicio por tipo.");

  const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
          "Authorization": `Bearer ${myBearerToken}` 
      }
  };

  try {
      const response = await fetch(`${baseUrl}/servicios/filtrar/tipo-de-servicio/${tipo}`, requestOptions);
      if (!response.ok) {
          throw new Error('Hubo un problema al obtener los datos de servicios filtrados por tipo.');
      }
      
      const result = await response.json(); // Parsear la respuesta como JSON
      console.log(result); // Loguea en la consola el resultado de los datos filtrados por tipo
      
      return result; // Retorna los datos filtrados por tipo para uso posterior
  } catch (error) {
      console.error(error);
      return []; // Retornar Array vacío en caso de error.
  }
}

export async function createServicio(servicioData) {
    const myBearerToken = Cookies.get('_auth');
    if (!myBearerToken) {
        console.log('No token found in the cookie.');
        return { success: false, message: 'No token found in the cookie.' };
    }

    console.log("Se obtuvo el Token de acceso por parte de las cookies, ejecutando importe de información de servicio.");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Authorization": `Bearer ${myBearerToken}`
        },
        body: JSON.stringify(servicioData),
        redirect: "follow"
    };

    try {
        const response = await fetch(baseUrl + "/servicios", requestOptions);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Hubo un problema al crear el servicio.');
        }

        console.log("Servicio creado exitosamente:", result);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al crear el servicio. Inténtelo de nuevo más tarde.' };
    }
}
export async function editServicio(servicioData, email) {
    const myBearerToken = Cookies.get('_auth');
    if (!myBearerToken) {
      console.log('No token found in the cookie.');
      return { success: false, message: 'No token found in the cookie.' };
    }
    
    console.log("Se obtuvo el Token de acceso por parte de las cookies, ejecutando importe de información de servicio.");
    console.log("ID: ", email);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Authorization": `Bearer ${myBearerToken}`
      },
      body: JSON.stringify(servicioData),
      redirect: "follow"
    };

    try {

      const response = await fetch(baseUrl + `/servicios/${email}`, requestOptions); // Replace "<string>" with the employee ID
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Hubo un problema al editar el servicio.');
      }
  
      console.log("Servicio editado exitosamente:", result);
      return { success: true, data: result };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error al editar el servicio. Inténtelo de nuevo más tarde.' };
    }
  }

export async function getServicio(email) {
    const myBearerToken = Cookies.get('_auth');
    if (!myBearerToken) {
        console.log('No token found in the cookie.');
        return { success: false, message: 'No token found in the cookie.' };
    }

    console.log("Se obtuvo el Token de acceso por parte de las cookies, obteniendo información del servicio.");

    const requestOptions = {
        method: "GET",
        headers: {
            "Accept": "*/*",
            "Authorization": `Bearer ${myBearerToken}`
        },
        redirect: "follow"
    };

    try {
        const response = await fetch(`${baseUrl}/servicios/${email}`, requestOptions);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching servicio data:", error);
        return { success: false, message: 'Error fetching servicio data.' };
    }
}

export async function onDeleteFunction(email) {
  try {
    await removeServicio(email);
    console.log('Servicio eliminado exitosamente.');
  } catch (error) {
    console.error('Error eliminando servicio:', error);
  }
}


  
  export async function removeServicio(idServicio) {
    try {
      const myBearerToken = Cookies.get('_auth');
      if (!myBearerToken) {
        console.log('No se encontró token en las cookies.');
        return { success: false, message: 'No se encontró token en las cookies.' };
      }
  
      console.log('Se obtuvo el Token de acceso por parte de las cookies, obteniendo información para borrar al servicio.');
  
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${myBearerToken}`);
  
      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      const response = await fetch(`${baseUrl}/servicios/${idServicio}`, requestOptions);
  
      if (!response.ok) {
        // Si la respuesta no fue exitosa, arrojamos un error con el código de respuesta
        throw new Error(`Error eliminando servicio: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Servicio eliminado de IdServicio:', idServicio );
      return data;
    } catch (error) {
      console.error('Error eliminando servicio:', error);
      return { success: false, message: 'Error al eliminar servicio.' };
    }
  }
  

  export async function getAllTiposDeServicio() {
    const myBearerToken = Cookies.get('_auth'); // Recuperar infomación del Token
    if (!myBearerToken) {
        console.log('No token found in the cookie.');
        return []; //Devuelve un array vacio si no se encuentra el Token.
    }

    console.log("Se obtuvo el Token de acceso por parte de las cookies, ejecutando importe de información de tipos de servicio.");


    const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
            "Authorization": `Bearer ${myBearerToken}` 
        }
    };

    try {
        const response = await fetch(baseUrl + "/servicios/tipo-de-servicios", requestOptions);
        if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos de servicios.');
        }
        
        const result = await response.json();
        console.log(result); // Loguea en la consola el resultado de los datos
        
        return result; // Tetorna los datos para uso posterior
    } catch (error) {
        console.error(error);
        return []; // Retornar Array vacio en caso de error.
    }
}