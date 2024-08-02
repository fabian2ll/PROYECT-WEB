function addUser(){
    let name = document.getElementById("input-name").value;
    let passwordOne = document.getElementById("input-passwordOne").value;
    let passwordTwo = document.getElementById("input-passwordTwo").value;
    if (passwordOne == passwordTwo){
        let userData = {
            name: name,
            password: passwordTwo 
        };
    
        let url = 'http://localhost:8080/Concessionaire/rest/ManagementUser/createUser';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert("Se agregó el registro.");
            window.location.href = "showMotorcycles.html";
        })
        .catch(error => 
            console.error('Ocurrió el siguiente error con la operación: ', error));
    
} else{
    alert("Las constraseñas no son iguales, intente de nuevo")
    throw new Error('Ocurrió un error en la verificacion de la constraseña: ' + response.statusText);
}
}