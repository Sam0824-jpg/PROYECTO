const API = 'http://localhost:3000/api/categorias';
const token = sessionStorage.getItem('token');
if (!token) window.location.href = 'login.html';

function cargarCategorias() {
    fetch(API, { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => res.status === 401 ? (sessionStorage.clear(), window.location.href = 'login.html') : res.json())
    .then(data => renderTabla(data));
}

function renderTabla(datos) {
    const tbody = document.getElementById('tablaCategorias');
    tbody.innerHTML = '';
    datos.forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td class="fw-bold">${c.id}</td>
                <td>${c.nombre}</td>
                <td>${c.descripcion}</td>
                <td>
                    <a href="categorias-editar.html?id=${c.id}" class="btn btn-outline-dark btn-sm me-2">Editar</a>
                    <button onclick="eliminarCategoria(${c.id})" class="btn btn-dark btn-sm">Eliminar</button>
                </td>
            </tr>`;
    });
}

function buscarPorNombre() {
    const nombre = document.getElementById('buscadorNombre').value.trim();
    const url = nombre ? `${API}/buscar/${nombre}` : API;
    
    fetch(url, { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => res.json())
    .then(data => renderTabla(data.mensaje ? [] : data));
}

function eliminarCategoria(id) {
    if (!confirm('¿Seguro que deseas eliminar esta categoría?')) return;
    fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('alerta').innerHTML = `<div class="alert alert-dark rounded-0">${data.mensaje}</div>`;
        cargarCategorias();
    });
}

cargarCategorias();