document.addEventListener('DOMContentLoaded', () => {
    // 1. Validar que exista una sesión activa
    const token = sessionStorage.getItem('token');
    const nombre = sessionStorage.getItem('nombre');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // 2. Poblar los datos de la interfaz
    document.getElementById('nombreUsuario').textContent = nombre || 'Mi Perfil';
    document.getElementById('perfilNombre').textContent = nombre || 'Usuario';
    document.getElementById('tituloBienvenida').textContent = `¡Bienvenido, ${nombre || 'Usuario'}!`;

    // Decodificar el correo electrónico desde el JWT
    let email = 'correo@ejemplo.com';
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.email) email = payload.email;
    } catch (e) {
        console.error("Error al decodificar JWT:", e);
    }
    document.getElementById('perfilEmail').textContent = email;

    // 3. Mostrar la fecha actual
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('fechaHora').textContent = new Date().toLocaleDateString('es-ES', opcionesFecha);

    // 4. Renderizar las tarjetas de los módulos disponibles
    cargarModulos();

    // 5. Quitar spinner y mostrar contenido
    setTimeout(() => {
        document.getElementById('spinner').classList.add('d-none');
        document.getElementById('contenido').classList.remove('d-none');
    }, 400); // Simulando carga
});

function cargarModulos() {
    const modulos = [
        { nombre: 'Categorías', desc: 'Añade y gestiona los oficios del catálogo general.', link: 'categorias.html' },
        { nombre: 'Prestadores', desc: 'Directorio de trabajadores, contactos y zonas de cobertura.', link: 'prestadores.html' }
    ];

    const contenedor = document.getElementById('tarjetasModulos');
    contenedor.innerHTML = modulos.map(m => `
        <div class="col-md-6">
            <div class="card p-4 h-100 border border-light-gray rounded-card bg-white shadow-sm">
                <h5 class="fw-bold text-dark mb-2">${m.nombre}</h5>
                <p class="text-muted mb-4 fs-7">${m.desc}</p>
                <a href="${m.link}" class="btn btn-primary rounded-pill-custom mt-auto w-100 text-center">Ir al módulo &rarr;</a>
            </div>
        </div>
    `).join('');
}

function cerrarSesion() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('nombre');
    window.location.href = 'login.html';
}