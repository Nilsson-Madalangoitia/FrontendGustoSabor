document.addEventListener('DOMContentLoaded', (event) => {
    obtenerSolicitudes();
});

function obtenerSolicitudes(){

    $.ajax({
        url: 'https://backend-servicio.fly.dev/api/solicitudes',
        type: 'GET',
        success: function(response) {
            const data_solicitudes = response.body;
            crearFormularios(data_solicitudes);
        },
        error: function(error) {
            console.error("Error:", error);
        }
    });

}

function crearFormularios(data_solicitudes) {
    const formularioLista = document.getElementById('formulario-lista');

    // Limpiar cualquier contenido existente en el contenedor
    formularioLista.innerHTML = '';

    // Iterar sobre los datos y crear cada formulario
    data_solicitudes.forEach(formulario => {
        // Crear elementos HTML dinámicamente
        const divFormulario = document.createElement('div');
        divFormulario.classList.add('formulario-item');

        const spanTitulo = document.createElement('span');
        spanTitulo.textContent = `Formulario: ${formulario.id}`;

        const spanFechaHora = document.createElement('span');
        spanFechaHora.textContent = `Fecha: 2024-06-21 Hora: 10:00`;

        const btnVerFormulario = document.createElement('button');
        btnVerFormulario.classList.add('btn', 'ver-formulario-btn');
        btnVerFormulario.textContent = 'Ver Formulario';
        btnVerFormulario.setAttribute('data-target', formulario.id); 
        btnVerFormulario.addEventListener('click', function() {
            toggleFormulario(formulario.id);
        });

        const divFormularioDetalle = document.createElement('div');
        divFormularioDetalle.classList.add('formulario-detalle');
        divFormularioDetalle.id = formulario.id;

        // Agregar detalles específicos del formulario
        const pNombre = document.createElement('p');
        pNombre.textContent = `Nombres: ${formulario.nombres}`;
        divFormularioDetalle.appendChild(pNombre);

        const apellidos = document.createElement('p');
        apellidos.textContent = `Apellidos: ${formulario.apellidos}`;
        divFormularioDetalle.appendChild(apellidos);

        const telefono = document.createElement('p');
        telefono.textContent = `Teléfono: ${formulario.telefono}`;
        divFormularioDetalle.appendChild(telefono);

        if(formulario.tipo === 'I'){
            const pTipo = document.createElement('p');
        pTipo.textContent = `Tipo: Información`;
        divFormularioDetalle.appendChild(pTipo);
        }

        if(formulario.tipo === 'P'){
            const pTipo = document.createElement('p');
            pTipo.textContent = `Tipo: Presupuesto`;
            divFormularioDetalle.appendChild(pTipo);
        }

        if(formulario.atendido === 'S'){
            const pAtendido = document.createElement('p');
            pAtendido.textContent = `Atendido: SI`;
            divFormularioDetalle.appendChild(pAtendido);
        }

        if(formulario.atendido === 'N'){
            const pAtendido = document.createElement('p');
            pAtendido.textContent = `Atendido: NO`;
            divFormularioDetalle.appendChild(pAtendido);
        }

        // Agregar elementos al formulario principal
        divFormulario.appendChild(spanTitulo);
        divFormulario.appendChild(spanFechaHora);
        divFormulario.appendChild(btnVerFormulario);
        divFormulario.appendChild(divFormularioDetalle);

        // Agregar el formulario al contenedor principal
        formularioLista.appendChild(divFormulario);
    });
}