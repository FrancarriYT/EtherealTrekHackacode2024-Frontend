import Cookies from 'js-cookie'; 
const baseUrl = 'http://localhost:8080/api/services';

export async function getAllVentas() {
    const myBearerToken = Cookies.get('_auth');
    if (!myBearerToken) {
        console.log('No se encontró token en las cookies.');
        return []; // Devuelve un array vacío si no se encuentra el Token.
    }

    console.log("Se obtuvo el Token de acceso por parte de las cookies, obteniendo información de ventas.");

    const myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Authorization", `Bearer ${myBearerToken}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(`${baseUrl}/ventas`, requestOptions);
        if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos de ventas.');
        }
        
        const result = await response.json();
        console.log(result); // Loguea en la consola el resultado de los datos de ventas
        
        return result; // Retorna los datos de ventas para uso posterior
    } catch (error) {
        console.error(error);
        return []; // Retornar Array vacío en caso de error.
    }
}

export async function createVenta(ventaData) {
    const myBearerToken = Cookies.get('_auth');
    if (!myBearerToken) {
        console.log('No se encontró token en las cookies.');
        return { success: false, message: 'No se encontró token en las cookies.' };
    }

    console.log("Se obtuvo el Token de acceso por parte de las cookies, creando nueva venta.");
    
    // Log the body data before sending
    console.log('Body data before sending:', ventaData);

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Authorization": `Bearer ${myBearerToken}`
        },
        body: JSON.stringify(ventaData),
        redirect: "follow"
    };

    try {
        const response = await fetch(`${baseUrl}/ventas`, requestOptions);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Hubo un problema al crear la venta.');
        }

        console.log("Venta creada exitosamente:", result);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al crear la venta. Inténtelo de nuevo más tarde.' };
    }
}



export async function editVenta(ventaData, ventaId) {
    const myBearerToken = Cookies.get('_auth');
    if (!myBearerToken) {
        console.log('No se encontró token en las cookies.');
        return { success: false, message: 'No se encontró token en las cookies.' };
    }
    
    console.log("Se obtuvo el Token de acceso por parte de las cookies, editando información de venta.");
    console.log("ID de venta: ", ventaId);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Authorization": `Bearer ${myBearerToken}`
      },
      body: JSON.stringify(ventaData),
      redirect: "follow"
    };

    try {

      const response = await fetch(`${baseUrl}/ventas/${ventaId}`, requestOptions);
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Hubo un problema al editar la venta.');
      }
  
      console.log("Venta editada exitosamente:", result);
      return { success: true, data: result };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error al editar la venta. Inténtelo de nuevo más tarde.' };
    }
}

export async function getVenta(ventaId) {
    const myBearerToken = Cookies.get('_auth');
    if (!myBearerToken) {
        console.log('No se encontró token en las cookies.');
        return { success: false, message: 'No se encontró token en las cookies.' };
    }

    console.log("Se obtuvo el Token de acceso por parte de las cookies, obteniendo información de la venta.");

    const requestOptions = {
        method: "GET",
        headers: {
            "Accept": "*/*",
            "Authorization": `Bearer ${myBearerToken}`
        },
        redirect: "follow"
    };

    try {
        const response = await fetch(`${baseUrl}/ventas/${ventaId}`, requestOptions);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error obteniendo información de la venta:", error);
        return { success: false, message: 'Error obteniendo información de la venta.' };
    }
}

export async function deleteVenta(ventaId) {
    try {
        const myBearerToken = Cookies.get('_auth');
        if (!myBearerToken) {
            console.log('No se encontró token en las cookies.');
            return { success: false, message: 'No se encontró token en las cookies.' };
        }

        console.log('Se obtuvo el Token de acceso por parte de las cookies, eliminando venta.');

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${myBearerToken}`);

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(`${baseUrl}/ventas/${ventaId}`, requestOptions);

        if (!response.ok) {
            throw new Error(`Error eliminando venta: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Venta eliminada:', data);
        return data;
    } catch (error) {
        console.error('Error eliminando venta:', error);
        return { success: false, message: 'Error eliminando venta.' };
    }
}
