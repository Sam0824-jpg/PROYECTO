const API = 'http://localhost:3000/api/categorias';
const token = sessionStorage.getItem('token');
if (!token) window.location.href = 'login.html';

const urlParams = new URLSearchParams(window.location.search);
const idCategoria = urlParams.get('id');

function cargarDatos() {
    fetch(`${API}/${idCategoria}`, { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => res.json())
    .then(data => {
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('descripcion').value = data.descripcion;
    });
}

function guardarCategoria() {
    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();

    fetch(`${API}/${idCategoria}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, descripcion })
    })
    .then(res => res.json())
    .then(() => window.location.href = 'categorias.html');
}

cargarDatos();