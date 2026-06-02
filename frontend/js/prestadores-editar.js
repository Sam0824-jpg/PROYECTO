const API = 'http://localhost:3000/api/prestadores';
const token = sessionStorage.getItem('token');
if (!token) window.location.href = 'login.html';

const urlParams = new URLSearchParams(window.location.search);
const idPrestador = urlParams.get('id');

function cargarDatos() {
    fetch(`${API}/${idPrestador}`, { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => res.json())
    .then(data => {
        // En edición normalmente no cambiamos IDs de relaciones para evitar errores de BD
        document.getElementById('usuarioId').value = data.usuario_id;
        document.getElementById('usuarioId').disabled = true;
        document.getElementById('categoriaId').value = data.categoria_id;
        document.getElementById('categoriaId').disabled = true;
        document.getElementById('telefono').value = data.telefono;
        document.getElementById('zona').value = data.zona_cobertura;
    });
}

function guardarPrestador() { // Reutilizamos el nombre de la función para el onsubmit
    const telefono = document.getElementById('telefono').value.trim();
    const zona_cobertura = document.getElementById('zona').value.trim();

    fetch(`${API}/${idPrestador}`, {
        method: 'PUT',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ telefono, zona_cobertura })
    })
    .then(res => res.json())
    .then(data => window.location.href = 'prestadores.html');
}

cargarDatos();