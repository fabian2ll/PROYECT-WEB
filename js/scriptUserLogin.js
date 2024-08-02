function validateUser(){
    let userName = document.getElementById("input-user").value;
    let password = document.getElementById("input-password").value;
    

    /* Propiedad para redirigir */
    //window.location.href = "nueva_pagina.html";

    fetch('http://localhost:8080/Concessionaire/rest/ManagementUser/validateUser?name=' +userName + '&password='+password)
    .then(response => response.json())
    .then(response => {
        if(response){
            window.location.href="showMotorcycles.html";
        }else{
            alert("El usuario no se encuentra registrado.");
        }
        
    })
    .catch( error => console.error('Error: ', error));

}
