let codeBook = "";
function loadPage(){
    let localStorageMotor = localStorage.getItem("userData");;
    let userData = JSON.parse(localStorageMotor);
    name = userData.name;
    document.getElementById("input-name").value = userData.name;
    document.getElementById("input-password").value = userData.password;
}
loadPage();

function updateBook(){
    let name = document.getElementById("input-name").value;
    let password = document.getElementById("input-password").value;
    

    
    let userData = {
        name: name,
        password: password
    };

    let url = 'http://localhost:8080/Concessionaire/rest/ManagementUser/updateUserAttribute';
    fetch(url, {
        method: 'PUT',
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
        alert("Se actualizó el registro.");
        window.location.href = "showUser.html";
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}