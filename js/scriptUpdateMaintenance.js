let codeBook = "";
function loadPage(){
    let localStorageMotor = localStorage.getItem("maintenanceData");;
    let maintenanceData = JSON.parse(localStorageMotor);
    plate = maintenanceData.plate;
    document.getElementById("input-plate").value = maintenanceData.plate;
    document.getElementById("input-brand").value =maintenanceData.brand;
    document.getElementById("input-date").value = maintenanceData.date;
}
loadPage();

function updateBook(){
    let plate = document.getElementById("input-plate").value;
    let brand = document.getElementById("input-brand").value;
    let date = document.getElementById("input-date").value;

    
    let maintenanceData = {
        plate: plate,
        brand: brand,
        date : date
    };

    let url = 'http://localhost:8080/Concessionaire/rest/ManagementMaintenance/updateMaintenanceAttribute';
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(maintenanceData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Se actualizó el registro.");
        window.location.href = "showMaintenance.html";
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}