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
