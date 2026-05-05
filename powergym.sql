-- ============================================================
--  PowerGym — Base de datos (PostgreSQL)
-- ============================================================
 
-- ------------------------------------------------------------
-- 1. USUARIOS
-- ------------------------------------------------------------
CREATE TABLE usuarios (
    id               SERIAL       PRIMARY KEY,
    nombre           VARCHAR(100) NOT NULL,
    email            VARCHAR(150) NOT NULL UNIQUE,
    contrasena       VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE         NOT NULL,
    membresia        VARCHAR(10)  NOT NULL DEFAULT 'basica' CHECK (membresia IN ('basica','pro','premium')),
    rol              VARCHAR(10)  NOT NULL DEFAULT 'socio'  CHECK (rol IN ('admin','socio')),
    fecha_registro   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
-- Usuario admin (contraseña: admin)
INSERT INTO usuarios (nombre, email, contrasena, fecha_nacimiento, membresia, rol)
VALUES ('Administrador', 'admin@powergym.com', '$2y$10$gFbuJovwn9NB/UyVsSIRIOuEUuxesVgpXT1c/B4qynXXMvZcfQfpC', '1990-01-01', 'premium', 'admin');
 
-- ------------------------------------------------------------
-- 2. CLASES
-- ------------------------------------------------------------
CREATE TABLE clases (
    id          SERIAL       PRIMARY KEY,
    nombre      VARCHAR(80)  NOT NULL,
    instructor  VARCHAR(100) NOT NULL,
    dia_semana  VARCHAR(10)  NOT NULL CHECK (dia_semana IN ('lunes','martes','miercoles','jueves','viernes','sabado')),
    hora_inicio TIME         NOT NULL,
    hora_fin    TIME         NOT NULL,
    plazas_max  SMALLINT     NOT NULL DEFAULT 20
);
 
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
    id          SERIAL    PRIMARY KEY,
    usuario_id  INT       NOT NULL,
    clase_id    INT       NOT NULL,
    fecha       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    CONSTRAINT fk_clase   FOREIGN KEY (clase_id)   REFERENCES clases   (id) ON DELETE CASCADE,
    CONSTRAINT uq_unico   UNIQUE (usuario_id, clase_id)
);
 
-- ------------------------------------------------------------
-- 4. CONSULTAS  (formulario de contacto)
-- ------------------------------------------------------------
CREATE TABLE consultas (
    id      SERIAL       PRIMARY KEY,
    nombre  VARCHAR(100) NOT NULL,
    email   VARCHAR(150) NOT NULL,
    mensaje TEXT         NOT NULL,
    fecha   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- 5. NOTIFICACIONES
-- ------------------------------------------------------------
CREATE TABLE notificaciones (
  id          SERIAL PRIMARY KEY,
  usuario_id  INT NOT NULL,
  titulo      VARCHAR(200) NOT NULL,
  mensaje     TEXT NOT NULL,
  leida       BOOLEAN NOT NULL DEFAULT false,
  fecha       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notif_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
)
 
-- ============================================================
--  FIN DEL SCRIPT
-- ============================================================