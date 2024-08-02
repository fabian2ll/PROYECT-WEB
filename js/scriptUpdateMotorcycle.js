let codeBook = "";
function loadPage(){
    let localStorageMotor = localStorage.getItem("motorcycleData");;
    let motorcycleData = JSON.parse(localStorageMotor);
    plate = motorcycleData.plate;
    document.getElementById("input-brand").value = motorcycleData.brand;
    document.getElementById("input-cylinder").value =motorcycleData.cylinder;
    
    document.getElementById("input-model").value = motorcycleData.model;
    document.getElementById("input-color").value = motorcycleData.color;
    document.getElementById("input-owner").value = motorcycleData.owner;
}
loadPage();

function updateBook(){
    let brand = document.getElementById("input-brand").value;
    let cylinder = document.getElementById("input-cylinder").value;
    let model = document.getElementById("input-model").value;
    let color = document.getElementById("input-color").value;
    let owner = document.getElementById("input-owner").value;
    
    let motorcycleData = {
        plate: plate,
        brand: brand,
        cylinder: cylinder,
        model: model,
        color: color,
        owner: owner
    };

    let url = 'http://localhost:8080/Concessionaire/rest/ManagementMotorcycle/updateMotorcycleAttribute';
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(motorcycleData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Se actualizó el registro.");
        window.location.href = "showMotorcycles.html";
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}