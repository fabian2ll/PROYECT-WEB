document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.nav-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
});


function loadBooks() {
    fetch('http://localhost:8080/Concessionaire/rest/ManagementUser/getUsers')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('content');
            data.forEach(user => {
                const card = document.createElement('div');
                card.className = 'card';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                /** Se hace la creación de cada componente **/
                /** Creamos la sección de título **/

                /** Creamos la sección de Autor **/

                const object = document.createElement('h2');
                object.className = 'card-tittle';
                object.textContent = ` ${"USER"}`;
                const name = document.createElement('p');
                name.className = 'card-text';
                name.textContent = `Name: ${user.name}`;

                /** Creamos la sección de Género **/
                const password = document.createElement('p');
                password.className = 'card-text';
                password.textContent = `Password: ${user.password}`;

                /** Creamos la sección de la editorial **/
                


                /* Creación de botones de eliminar */
            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn-danger';
            btnEliminar.id = `btn-delete-${user.name}`;
            btnEliminar.textContent = `Eliminar`;
            btnEliminar.setAttribute('data-plate', user.name);

            // Agregar event listener al botón
            btnEliminar.addEventListener('click', function() {
                const bookCode = this.getAttribute('data-name');
                deleteBookById(bookCode);
            });

            /* Creación del botón de actualizar */
            const btnActualizar = document.createElement('button');
            btnActualizar.className = 'btn-success margin';
            btnActualizar.id = `btn-delete-${user.name}`;
            btnActualizar.textContent = `Actualizar`;

            // Agregar event listener al botón
            btnActualizar.addEventListener('click', function() {
                localStorage.setItem("userData", JSON.stringify(user));
                window.location.href = "updateUser.html";
            });

                cardBody.appendChild(object);
                
                
                cardBody.appendChild(name);
                cardBody.appendChild(password);
                
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
    let url = 'http://localhost:8080/Concessionaire/rest/ManagementUser/deleteUser?name='+code;
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