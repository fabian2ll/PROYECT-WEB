function addMaintenance(){
    let plate = document.getElementById("input-plate").value;
    let brand = document.getElementById("input-brand").value;
    let date = document.getElementById("input-date").value;
 
    let maintenanceData = {
        plate: plate,
        brand: brand,
        date: date
    };
    fetch('http://localhost:8080/Concessionaire/rest/ManagementMaintenance/validateMaintenance?plate=' +plate)
    .then(response => response.json())
    .then(response => {
        if(response){
           

            let url = 'http://localhost:8080/Concessionaire/rest/ManagementMaintenance/createMaintenance';
            fetch(url, {
                method: 'POST',
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
                alert("Se agregó el registro.");
                window.location.href = "showMaintenance.html";
            })
            .catch(error => 
                console.error('Ocurrió el siguiente error con la operación: ', error));
           
        }else{
            alert("La moto no se encuentra registrada.");

           
        }
        
    })
    .catch( error => console.error('Error: ', error));
    
  


    
}