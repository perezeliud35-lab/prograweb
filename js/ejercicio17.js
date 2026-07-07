const inputTarea = document.getElementById('inputTarea');
const btnAgregar = document.getElementById('btnAgregar');
const listaTareas = document.getElementById('listaTareas');
const mensajeVacio = document.getElementById('mensajeVacio');


const manejarTareas = (function () {

    
    let tareas = cargarDesdeStorage();

    function cargarDesdeStorage() {
        const datosGuardados = localStorage.getItem('tareas');
        return datosGuardados ? JSON.parse(datosGuardados) : [];
    }

    function guardarEnStorage() {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    /**
     * Agrega una nueva tarea al arreglo privado 
     * @param {string} texto - Descripción de la tarea.
     */
    function agregarTarea(texto) {
        const nuevaTarea = {
            id: Date.now(),       // id único basado en la fecha/hora actual
            texto: texto,
            completada: false
        };
        tareas.push(nuevaTarea);
        guardarEnStorage();
    }

    /**
     * Elimina una tarea del arreglo privado según su id, y actualiza
     * el storage.
     * @param {number} id - Identificador de la tarea a eliminar.
     */
    function eliminarTarea(id) {
        tareas = tareas.filter(tarea => tarea.id !== id);
        guardarEnStorage();
    }

  
    function obtenerTareas() {
        return tareas;
    }


    return {
        agregarTarea,
        eliminarTarea,
        obtenerTareas
    };

})();



function renderizarTareas() {
 
    const tareas = manejarTareas.obtenerTareas();

    listaTareas.innerHTML = '';

    if (tareas.length === 0) {
        mensajeVacio.style.display = 'block';
        return;
    }

    mensajeVacio.style.display = 'none';

    tareas.forEach(function (tarea) {
        const item = document.createElement('li');
        item.className = 'tarea-item';

        const texto = document.createElement('span');
        texto.textContent = tarea.texto;

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'boton-eliminar';
        btnEliminar.addEventListener('click', function () {
            confirmarEliminar(tarea.id);
        });

        item.appendChild(texto);
        item.appendChild(btnEliminar);
        listaTareas.appendChild(item);
    });
}


/**
 * Muestra una confirmación con SweetAlert2 antes de eliminar una tarea.
 * @param {number} id - Identificador de la tarea a eliminar.
 */
function confirmarEliminar(id) {
    Swal.fire({
        title: '¿Eliminar esta tarea?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then(function (resultado) {
        if (resultado.isConfirmed) {
            manejarTareas.eliminarTarea(id);
            renderizarTareas();
            Swal.fire({
                title: 'Eliminada',
                text: 'La tarea se eliminó correctamente.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}


btnAgregar.addEventListener('click', function () {
    const texto = inputTarea.value.trim();

    if (texto === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campo vacío',
            text: 'Escribe una tarea antes de agregarla.'
        });
        return;
    }

    manejarTareas.agregarTarea(texto);
    inputTarea.value = '';
    inputTarea.focus();
    renderizarTareas();
});


renderizarTareas();
