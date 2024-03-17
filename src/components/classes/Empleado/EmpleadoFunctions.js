export async function getAllEmpleados(){
    const baseUrl = 'http://localhost:8001/'
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      const response = await fetch(baseUrl + "empleados", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    const result = await response.json();
    console.log(result);
}