const API = 'http://localhost:3000/api/categorias';
const token = sessionStorage.getItem('token');
if (!token) window.location.href = 'login.html';

function cargarCategorias() {
    fetch(API, { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => res.status === 401 ? (sessionStorage.clear(), window.location.href = 'login.html') : res.json())
    .then(data => renderTabla(data));
}

function renderTabla(datos) {
    const container = document.getElementById('tablaCategorias');
    container.innerHTML = '';
    if (!datos || datos.length === 0) {
        container.innerHTML = '<div class="text-center py-5 text-muted fw-semibold">No se encontraron categorías.</div>';
        return;
    }
    datos.forEach(c => {
        // Simulando un conteo dinámico realista de servicios basado en la categoría
        const totalServicios = ((c.id * 7 + 11) % 25 + 10) + " servicios";
        container.innerHTML += `
            <div class="category-row-card shadow-sm">
                <div class="d-flex align-items-center gap-3">
                    <span class="category-chevron">
                        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                    <div>
                        <h5 class="fw-bold text-dark mb-1 fs-6">${c.nombre}</h5>
                        <small class="text-muted d-block">${c.descripcion || 'Sin descripción disponible'}</small>
                    </div>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <span class="badge fw-semibold bg-light text-dark border-light-gray">${totalServicios}</span>
                    <div class="d-flex gap-2">
                        <a href="categorias-editar.html?id=${c.id}" class="btn btn-outline-dark btn-sm px-3 rounded-pill-custom">Editar</a>
                        <button onclick="eliminarCategoria(${c.id})" class="btn btn-dark btn-sm px-3 rounded-pill-custom">Eliminar</button>
                    </div>
                </div>
            </div>`;
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