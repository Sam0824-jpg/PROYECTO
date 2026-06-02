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
    const container = document.getElementById('tablaPrestadores');
    container.innerHTML = '';
    if (!datos || datos.length === 0) {
        container.innerHTML = '<div class="text-center py-5 text-muted fw-semibold">No se encontraron prestadores.</div>';
        return;
    }
    datos.forEach(p => {
        container.innerHTML += `
            <div class="category-row-card shadow-sm">
                <div class="d-flex align-items-center gap-3">
                    <span class="category-chevron">
                        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </span>
                    <div>
                        <h5 class="fw-bold text-dark mb-1 fs-6">Contacto: ${p.telefono}</h5>
                        <small class="text-muted d-block">📍 Zona: ${p.zona_cobertura || 'Sin cobertura registrada'}</small>
                    </div>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <span class="badge fw-semibold badge-green">✓ Verificado</span>
                    <div class="d-flex gap-2">
                        <a href="prestadores-editar.html?id=${p.id}" class="btn btn-outline-dark btn-sm px-3 rounded-pill-custom">Editar</a>
                        <button onclick="eliminarPrestador(${p.id})" class="btn btn-dark btn-sm px-3 rounded-pill-custom">Eliminar</button>
                    </div>
                </div>
            </div>`;
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