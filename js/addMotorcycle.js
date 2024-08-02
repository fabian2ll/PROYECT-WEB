function addMotorcycle(){
    let brand = document.getElementById("input-brand").value;
    let cylinder = document.getElementById("input-cylinder").value;
    let plate = document.getElementById("input-plate").value;
    let model = document.getElementById("input-model").value;
    let color = document.getElementById("input-color").value;
    let owner = document.getElementById("input-owner").value;
    let motorcycleData = {
        brand: brand,
        cylinder: cylinder,
        plate: plate,
        model: model,
        color: color,
        owner: owner
    };

    let url = 'http://localhost:8080/Concessionaire/rest/ManagementMotorcycle/createMotorcycle';
    fetch(url, {
        method: 'POST',
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
        alert("Se agregó el registro.");
        window.location.href = "showMotorcycles.html";
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}