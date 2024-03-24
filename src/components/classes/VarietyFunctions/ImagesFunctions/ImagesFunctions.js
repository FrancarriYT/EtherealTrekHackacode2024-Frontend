import Cookies from 'js-cookie';

const baseUrl = 'http://localhost:8080/api/services/files';

export async function getImages(imageId) {
    const myBearerToken = Cookies.get('_auth');

    if (!myBearerToken) {
        console.log('No token found in the cookie.');
        return null;
    }

    console.log("Token de acceso obtenido de las cookies. Obteniendo la imagen.");

    const myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Authorization", `Bearer ${myBearerToken}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(`${baseUrl}/${imageId}`, requestOptions);
        if (!response.ok) {
            throw new Error('Hubo un problema al obtener la imagen.');
        }
        
        return response.blob(); // Devuelve la imagen como objeto Blob
    } catch (error) {
        console.error(error);
        return null;
    }
}


export async function createImage(file) {
    const myBearerToken = Cookies.get('_auth');

    if (!myBearerToken) {
        console.log('No token found in the cookie.');
        return { success: false, message: 'No token found in the cookie.' };
    }

    console.log("Token de acceso obtenido de las cookies. Creando la imagen en la base de datos.");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${myBearerToken}`);

    const formdata = new FormData();
    formdata.append("file", file, file.name); // Aquí se debe utilizar file.name en lugar de fileInput.files[0] y file en lugar de file

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    try {
        const response = await fetch(baseUrl, requestOptions);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Hubo un problema al crear la imagen en la base de datos.');
        }

        console.log("Imagen creada exitosamente en la base de datos:", result);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al crear la imagen en la base de datos. Inténtelo de nuevo más tarde.' };
    }
}


export async function editarImagenPrincipalDeServicio(servicioId, imagenId) {
    const myBearerToken = Cookies.get('_auth');

    if (!myBearerToken) {
        console.log('No token found in the cookie.');
        return { success: false, message: 'No token found in the cookie.' };
    }

    console.log("Token de acceso obtenido de las cookies, actualizando la imagen principal del servicio.");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${myBearerToken}`);

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow"
    };

    const url = `http://localhost:8080/api/services/servicios/actualizar-imagen-principal?servicioId=${servicioId}&imagenId=${imagenId}`;

    try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Hubo un problema al editar la imagen principal del servicio.');
        }

        console.log("Imagen principal del servicio editada exitosamente:", result);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al editar la imagen principal del servicio. Inténtelo de nuevo más tarde.' };
    }
}

export async function obtenerTodasLasImagenesInfo() {
    const myBearerToken = Cookies.get('_auth');

    if (!myBearerToken) {
        console.log('No se encontró el token en la cookie.');
        return { success: false, message: 'No se encontró el token en la cookie.' };
    }

    console.log("Token de acceso obtenido de las cookies, obteniendo todas las imágenes.");

    const myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Authorization", `Bearer ${myBearerToken}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(`${baseUrl}/files-paths`, requestOptions);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Hubo un problema al obtener todas las imágenes.');
        }

        console.log("Todas las imágenes obtenidas exitosamente:", result);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al obtener todas las imágenes. Inténtelo de nuevo más tarde.' };
    }
}