import Cookies from 'js-cookie';

const baseUrl = 'http://localhost:8080/api/';

export async function getAllRoles() {
    const myBearerToken = Cookies.get('_auth');
    if (!myBearerToken) {
        console.log('No token found in the cookie.');
        return [];
    }

    console.log("Fetching roles from the server...");

    const requestOptions = {
        method: "GET",
        headers: {
            "Accept": "*/*",
            "Authorization": `Bearer ${myBearerToken}`
        },
        redirect: "follow"
    };

    try {
        const response = await fetch(baseUrl + "usuarios/roles", requestOptions);
        if (!response.ok) {
            throw new Error('Hubo un problema al obtener los roles.');
        }
        
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}
