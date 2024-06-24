document.addEventListener('DOMContentLoaded', (event) => {
    obtenerServicios()
});

// Datos de ejemplo de los servicios
const servicios = {
    bodas: {
        titulo: "Catering para Bodas",
        descripcion: "Ofrecemos servicios de catering especializado para bodas, creando menús personalizados y una experiencia culinaria única para los novios y sus invitados.",
        imagen: "img/catering-boda.png"
    },
    corporativo: {
        titulo: "Catering Corporativo",
        descripcion: "Brindamos servicios de catering para eventos corporativos, adaptándonos a las necesidades y preferencias de tu empresa para crear una experiencia gastronómica memorable.",
        imagen: "img/catering-ejecutivo.jpeg"
    },
    tematico: {
        titulo: "Catering Temático",
        descripcion: "Nuestro servicio de catering temático te permite personalizar la experiencia culinaria según el tema de tu evento, creando un ambiente inmersivo y delicioso.",
        imagen: "img/catering-tematico.jpg"
    }
};

// Función para cargar la información del servicio seleccionado
function cargarInfoServicio(categoria) {
    const serviceInfo = document.querySelector(".service-info");
    const servicio = servicios[categoria];

    serviceInfo.innerHTML = `
        <img src="${servicio.imagen}" alt="${servicio.titulo}">
        <div>
            <h3>${servicio.titulo}</h3>
            <p>${servicio.descripcion}</p>
        </div>
    `;
}

// Evento para cambiar la categoría de servicios al hacer clic en la barra lateral
const sidebarItems = document.querySelectorAll(".services-sidebar li");
sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
        sidebarItems.forEach(item => item.classList.remove("active"));
        item.classList.add("active");
        const categoria = item.dataset.category;
        cargarInfoServicio(categoria);
    });
});

// Cargar la información del servicio de bodas por defecto al cargar la página
cargarInfoServicio("bodas");

function obtenerServicios(){

    $.ajax({
        url: 'https://backend-servicio.fly.dev/api/servicios',
        type: 'GET',
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.error("Error:", error);
        }
    });

}

function agregarSolicitud(){

    var data = {
        nombres: $("#nombres").val(),
        apellidos: $("#apellidos").val(),
        telefono: $("#telefono").val(),
        tipo: $("#contacto").val(),
        atendido: "N"
    }

    $.ajax({
        url: 'https://backend-servicio.fly.dev/api/solicitudes',
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
        text: 'La solicitud se envió correctamente',
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'OK',
        background: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'index.html';
        }
    });
}