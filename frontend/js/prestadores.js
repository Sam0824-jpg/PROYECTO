const API = 'http://localhost:3000/api/prestadores';
const token = sessionStorage.getItem('token');

if (!token) window.location.href = 'login.html';

function cargarPrestadores() {
    fetch(API, { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => res.status === 401 ? (sessionStorage.clear(), window.location.href = 'login.html') : res.json())
    .then(data => renderTabla(data))
    .catch(err => console.error(err));
}

function renderTabla(datos) {
    const tbody = document.getElementById('tablaPrestadores');
    tbody.innerHTML = '';
    datos.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td class="fw-bold">${p.id}</td>
                <td>${p.telefono}</td>
                <td>${p.zona_cobertura}</td>
                <td>
                    <a href="prestadores-editar.html?id=${p.id}" class="btn btn-outline-dark btn-sm me-2">Editar</a>
                    <button onclick="eliminarPrestador(${p.id})" class="btn btn-dark btn-sm">Eliminar</button>
                </td>
            </tr>`;
    });
}

function buscarPorZona() {
    const zona = document.getElementById('buscadorZona').value.trim();
    const url = zona ? `${API}/zona/${zona}` : API;
    
    fetch(url, { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => res.json())
    .then(data => renderTabla(data.mensaje ? [] : data)); // Si devuelve error 404, vaciar tabla
}

function eliminarPrestador(id) {
    if (!confirm('¿Estás seguro de eliminar este prestador de la plataforma?')) return;

    fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('alerta').innerHTML = `<div class="alert alert-dark rounded-0">${data.mensaje}</div>`;
        cargarPrestadores();
    });
}

cargarPrestadores();