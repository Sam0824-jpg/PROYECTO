const API = 'http://localhost:3000/api';
const token = sessionStorage.getItem('token');
const nombre = sessionStorage.getItem('nombre');

if (!token) {
    window.location.href = 'login.html';
}

document.getElementById('nombreUsuario').textContent = nombre || '';
document.getElementById('perfilNombre').textContent = nombre || 'Usuario';

function cargarInicio() {
    fetch(`${API}/inicio`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
        if (res.status === 401) {
            sessionStorage.clear();
            window.location.href = 'login.html';
            return;
        }
        return res.json();
    })
    .then(data => {
        if (!data) return;
        
        document.getElementById('spinner').classList.add('d-none');
        document.getElementById('contenido').classList.remove('d-none');
        
        document.getElementById('tituloBienvenida').textContent = data.sistema || 'Panel de Administración';
        document.getElementById('fechaHora').textContent = new Date(data.fecha_servidor || data.fecha).toLocaleDateString('es-MX', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        const contenedor = document.getElementById('tarjetasModulos');
        contenedor.innerHTML = '';

        // Renderizar Módulos Activos
        if(data.modulos_activos) {
            data.modulos_activos.forEach(modulo => {
                // Formatear la URL quitando tildes y a minúsculas
                const urlModulo = modulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + ".html";
                contenedor.innerHTML += `
                    <div class="col-md-4">
                        <div class="card h-100 p-3 text-center">
                            <h5 class="fw-bold text-capitalize">${modulo}</h5>
                            <a href="${urlModulo}" class="btn btn-dark btn-sm mt-2">Ir al módulo</a>
                        </div>
                    </div>`;
            });
        }
    })
    .catch(() => {
        document.getElementById('spinner').classList.add('d-none');
        mostrarAlerta('Error al cargar. Verifica el servidor.', 'danger');
    });
}

function cerrarSesion() {
    if (!confirm('¿Seguro que deseas cerrar sesión?')) return;
    sessionStorage.clear();
    window.location.href = 'login.html';
}

function mostrarAlerta(mensaje, tipo) {
    document.getElementById('alerta').innerHTML = `
        <div class="alert alert-${tipo} rounded-0 border-dark">${mensaje}</div>`;
}

cargarInicio();