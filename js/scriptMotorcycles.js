document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.nav-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

document.getElementById('button-books').addEventListener('click', function(event) {
    alert('¡Botón clickeado!');
});

document.getElementById('button-borrow').addEventListener('click', function(event) {
    alert('¡Botón clickeado!');
});

function loadBooks() {
    fetch('http://localhost:8080/Concessionaire/rest/ManagementMotorcycle/getMotorcycles')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('content');
            data.forEach(motorcycle => {
                const card = document.createElement('div');
                card.className = 'card';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                /** Se hace la creación de cada componente **/
                /** Creamos la sección de título **/

                /** Creamos la sección de Autor **/

                const object = document.createElement('h2');
                object.className = 'card-text';
                object.textContent = `Type: ${"Motorcycle"}`;
                const brand = document.createElement('p');
                brand.className = 'card-text';
                brand.textContent = `Brand: ${motorcycle.brand}`;

                /** Creamos la sección de Género **/
                const cylinder = document.createElement('p');
                cylinder.className = 'card-text';
                cylinder.textContent = `Cylinder: ${motorcycle.cylinder}`;

                /** Creamos la sección de la editorial **/
                const plate = document.createElement('p');
                plate.className = 'card-text';
                plate.textContent = `Plate: ${motorcycle.plate}`;

                /** Sección de la cantidad de páginas del libro **/
                const model = document.createElement('p');
                model.className = 'card-text';
                model.textContent = `Model: ${motorcycle.model}`;

                /** Sección del año de publicación **/
                const color = document.createElement('p');
                color.className = 'card-text';
                color.textContent = `Color: ${motorcycle.color}`;
                const owner = document.createElement('p');
                owner.className = 'card-text';
                owner.textContent = `Owner: ${motorcycle.owner}`;

                /* Creación de botones de eliminar */
            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn-danger';
            btnEliminar.id = `btn-delete-${motorcycle.plate}`;
            btnEliminar.textContent = `Eliminar`;
            btnEliminar.setAttribute('data-plate', motorcycle.plate);

            // Agregar event listener al botón
            btnEliminar.addEventListener('click', function() {
                const bookCode = this.getAttribute('data-plate');
                deleteBookById(bookCode);
            });

            /* Creación del botón de actualizar */
            const btnActualizar = document.createElement('button');
            btnActualizar.className = 'btn-success margin';
            btnActualizar.id = `btn-delete-${motorcycle.code}`;
            btnActualizar.textContent = `Actualizar`;

            // Agregar event listener al botón
            btnActualizar.addEventListener('click', function() {
                localStorage.setItem("motorcycleData", JSON.stringify(motorcycle));
                window.location.href = "./updatepage.html";
            });

                cardBody.appendChild(object);
                cardBody.appendChild(brand);
                cardBody.appendChild(cylinder);
                cardBody.appendChild(plate);
                cardBody.appendChild(model);
                cardBody.appendChild(color);
                cardBody.appendChild(owner);
                 /* Agregamos el botón eliminar */
            cardBody.appendChild(btnEliminar);

            /* Agregamos el botón eliminar */
            cardBody.appendChild(btnActualizar);

            /** Agregamos el body al card */
            card.appendChild(cardBody);

            /** Agregamos el card al content */
            content.appendChild(card);

            })
        })
    .catch(error => console.error(Error,error));
}
loadBooks();

function cleanContent(){
    const content = document.getElementById('content');
    content.innerHTML = "";
}

function deleteBookById(code){
    let url = 'http://localhost:8080/Concessionaire/rest/ManagementMotorcycle/deleteMotorcycles?plate='+code;
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Se eliminó el registro");
        cleanContent();
        loadBooks();
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}