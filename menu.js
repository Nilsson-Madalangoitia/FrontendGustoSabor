class Menu {
    constructor(id, name, description, price, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    obtenerServicios();
    obtenerCategorias();
});


function obtenerServicios(){

    $.ajax({
        url: 'https://backend-servicio.fly.dev/api/servicios',
        type: 'GET',
        success: function(response) {
            const data_servicios = response.body;
            createTable(data_servicios);
        },
        error: function(error) {
            console.error("Error:", error);
        }
    });

}

function obtenerCategorias(){

    $.ajax({
        url: 'https://backend-servicio.fly.dev/api/categorias',
        type: 'GET',
        success: function(response) {
            const data_categorias = response.body;
            createSelect(data_categorias);
        },
        error: function(error) {
            console.error("Error:", error);
        }
    });

}

function createSelect(data) {
    const select = document.getElementById("categoria");

    select.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione';
    defaultOption.setAttribute('disabled', 'disabled');
    defaultOption.setAttribute('selected', 'selected');
    select.appendChild(defaultOption);

    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.nombre;
        select.appendChild(option);
    });
}

function createTable(data) {
    const tableBody = document.querySelector("#dynamicTable tbody");

    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");

        Object.values(item).forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
}

function agregarServicio(){

    var id_categoria = $("#categoria").val()

    var data = {
        idcategoria: parseInt(id_categoria),
        nombre: $("#nombre").val(),
        descripcion: $("#descripcion").val(),
        precio: $("#precio").val()
    }

    $.ajax({
        url: 'https://backend-servicio.fly.dev/api/servicios',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            showAlert();
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

function showAlert() {
    Swal.fire({
        title: 'Success!',
        text: 'El plato se agregó correctamente',
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'OK',
        background: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.reload();
        }
    });
}