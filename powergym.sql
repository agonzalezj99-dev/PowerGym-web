-- ============================================================
--  PowerGym — Base de datos 
-- ============================================================

CREATE DATABASE IF NOT EXISTS powergym
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_spanish_ci;

USE powergym;

-- ------------------------------------------------------------
-- 1. USUARIOS
-- ------------------------------------------------------------
CREATE TABLE usuarios (
    id               INT          UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre           VARCHAR(100) NOT NULL,
    email            VARCHAR(150) NOT NULL UNIQUE,
    contrasena       VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE         NOT NULL,
    membresia        ENUM('basica','pro','premium') NULL DEFAULT 'basica',
    rol              ENUM('admin','socio') NOT NULL DEFAULT 'socio',
    fecha_registro   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 2. CLASES
-- ------------------------------------------------------------
CREATE TABLE clases (
    id          INT         UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(80) NOT NULL,
    instructor  VARCHAR(100) NOT NULL,
    dia_semana  ENUM('lunes','martes','miercoles','jueves','viernes','sabado') NOT NULL,
    hora_inicio TIME        NOT NULL,
    hora_fin    TIME        NOT NULL,
    plazas_max  TINYINT     UNSIGNED NOT NULL DEFAULT 20
) ENGINE=InnoDB;

INSERT INTO clases (nombre, instructor, dia_semana, hora_inicio, hora_fin) VALUES
    ('Yoga',     'Laura Sánchez', 'lunes',     '09:00', '10:00'),
    ('Yoga',     'Laura Sánchez', 'miercoles', '09:00', '10:00'),
    ('Yoga',     'Laura Sánchez', 'viernes',   '09:00', '10:00'),
    ('Spinning', 'Carlos Mena',   'lunes',     '18:30', '19:30'),
    ('Spinning', 'Carlos Mena',   'martes',    '18:30', '19:30'),
    ('Spinning', 'Carlos Mena',   'jueves',    '18:30', '19:30'),
    ('Spinning', 'Carlos Mena',   'viernes',   '18:30', '19:30'),
    ('Zumba',    'Ana Torres',    'martes',    '19:30', '20:30'),
    ('Zumba',    'Ana Torres',    'jueves',    '19:30', '20:30');

-- ------------------------------------------------------------
-- 3. INSCRIPCIONES  (usuario ↔ clase)
-- ------------------------------------------------------------
CREATE TABLE inscripciones (
    id          INT       UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id  INT       UNSIGNED NOT NULL,
    clase_id    INT       UNSIGNED NOT NULL,
    fecha       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    CONSTRAINT fk_clase   FOREIGN KEY (clase_id)   REFERENCES clases   (id) ON DELETE CASCADE,
    CONSTRAINT uq_unico   UNIQUE (usuario_id, clase_id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 4. CONSULTAS  (formulario de contacto)
-- ------------------------------------------------------------
CREATE TABLE consultas (
    id          INT          UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL,
    email       VARCHAR(150) NOT NULL,
    mensaje     TEXT         NOT NULL,
    fecha       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
--  FIN DEL SCRIPT
-- ============================================================
