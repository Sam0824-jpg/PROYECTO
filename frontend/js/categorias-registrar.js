const API = 'http://localhost:3000/api/categorias';
const token = sessionStorage.getItem('token');
if (!token) window.location.href = 'login.html';

function guardarCategoria() {
    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();

    fetch(API, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, descripcion })
    })
    .then(res => res.json())
    .then(() => window.location.href = 'categorias.html');
}