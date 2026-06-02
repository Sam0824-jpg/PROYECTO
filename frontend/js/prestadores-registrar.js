const API = '/api/prestadores';
const token = sessionStorage.getItem('token');
if (!token) window.location.href = 'login.html';

function guardarPrestador() {
    const usuario_id = document.getElementById('usuarioId').value;
    const categoria_id = document.getElementById('categoriaId').value;
    const telefono = document.getElementById('telefono').value.trim();
    const zona_cobertura = document.getElementById('zona').value.trim();
    
    if (telefono.length !== 10) {
        mostrarAlerta('El teléfono debe tener exactamente 10 dígitos.', 'warning');
        return;
    }

    fetch(API, {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ usuario_id, categoria_id, telefono, zona_cobertura })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error || data.mensaje === 'Token inválido') {
            mostrarAlerta(data.error || data.mensaje, 'danger');
            return;
        }
        window.location.href = 'prestadores.html';
    });
}

function mostrarAlerta(mensaje, tipo) {
    document.getElementById('alerta').innerHTML = `<div class="alert alert-${tipo} rounded-0 border-dark">${mensaje}</div>`;
}