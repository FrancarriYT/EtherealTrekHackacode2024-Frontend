import Cookies from 'js-cookie';

const baseUrl = 'http://localhost:8080/api/';

export async function getPaisesPorContinente(continente) {
    const myBearerToken = Cookies.get('_auth');
    if (!myBearerToken) {
        console.log('No se encontró ningún token en la cookie.');
        return { success: false, message: 'No se encontró ningún token en la cookie.' };
    }

    console.log("Token de acceso obtenido de las cookies, obteniendo información de países por continente.");

    const myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Authorization", `Bearer ${myBearerToken}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(`${baseUrl}usuarios/paises/region/${continente}`, requestOptions);
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}

export async function getPaises() {
    const myBearerToken = Cookies.get('_auth');
    if (!myBearerToken) {
        console.log('No se encontró ningún token en la cookie.');
        return { success: false, message: 'No se encontró ningún token en la cookie.' };
    }

    console.log("Token de acceso obtenido de las cookies, obteniendo información de países por continente.");

    const myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Authorization", `Bearer ${myBearerToken}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(`${baseUrl}usuarios/paises`, requestOptions);
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}
