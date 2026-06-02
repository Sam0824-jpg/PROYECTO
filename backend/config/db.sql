CREATE DATABASE fyne_db;
USE fyne_db;

-- Módulo 1: Usuarios (Auth)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'prestador', 'admin') DEFAULT 'cliente'
);

-- Módulo 2: Categorías de Oficios
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

-- Módulo 3: Prestadores (Trabajadores de oficios)
CREATE TABLE prestadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    categoria_id INT,
    telefono VARCHAR(20),
    zona_cobertura VARCHAR(100),
    verificado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Módulo 4: Servicios (Catálogo de lo que ofrecen)
CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prestador_id INT,
    titulo VARCHAR(100) NOT NULL,
    precio_base DECIMAL(10,2),
    FOREIGN KEY (prestador_id) REFERENCES prestadores(id)
);

-- Módulo 5: Reseñas (Calificaciones de clientes)
CREATE TABLE resenas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prestador_id INT,
    cliente_id INT,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    FOREIGN KEY (prestador_id) REFERENCES prestadores(id),
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id)
);

-- INSERTAR DATOS DE PRUEBA REALES (Mínimo 5 por tabla)
INSERT INTO categorias (nombre, descripcion) VALUES 
('Plomería', 'Reparación de tuberías y fugas'),
('Electricidad', 'Instalaciones eléctricas y cableado'),
('Carpintería', 'Muebles a medida y reparaciones'),
('Mecánica', 'Mecánica automotriz a domicilio'),
('Limpieza', 'Limpieza profunda de hogares');

INSERT INTO usuarios (nombre, email, password, rol) VALUES 
('Samuel Villa', 'samuel@fyne.mx', 'encriptada123', 'admin'),
('Juan Perez', 'juan.plomero@mail.com', 'encriptada123', 'prestador'),
('Maria Lopez', 'maria.elec@mail.com', 'encriptada123', 'prestador'),
('Carlos Ruiz', 'carlos.cliente@mail.com', 'encriptada123', 'cliente'),
('Ana Torres', 'ana.cliente@mail.com', 'encriptada123', 'cliente');

INSERT INTO prestadores (usuario_id, categoria_id, telefono, zona_cobertura, verificado) VALUES 
(2, 1, '4491234567', 'Norte Aguascalientes', TRUE),
(3, 2, '4497654321', 'Centro Aguascalientes', TRUE),
(2, 1, '4491112233', 'Sur Aguascalientes', FALSE),
(3, 2, '4494445566', 'Jesús María', TRUE),
(2, 1, '4499998877', 'Todo el estado', TRUE);

INSERT INTO servicios (prestador_id, titulo, precio_base) VALUES
(1, 'Reparación de fuga de agua visible', 350.00),
(1, 'Instalación de lavabo o sanitario', 600.00),
(2, 'Diagnóstico de corto circuito', 250.00),
(2, 'Instalación de ventilador de techo', 450.00),
(3, 'Mantenimiento preventivo de plomería general', 800.00);

INSERT INTO resenas (prestador_id, cliente_id, calificacion, comentario) VALUES
(1, 4, 5, 'Excelente plomero, Juan llegó puntual y arregló la fuga rapidísimo.'),
(1, 5, 4, 'Buen trabajo y muy amable, aunque tardó un poco en encontrar la falla.'),
(2, 4, 5, 'María es muy profesional. La instalación eléctrica quedó perfecta y segura.'),
(2, 5, 5, 'Súper recomendada, resolvió el apagón en mi casa en menos de una hora.'),
(3, 4, 3, 'El servicio fue aceptable, pero me pareció un poco elevado el costo.');