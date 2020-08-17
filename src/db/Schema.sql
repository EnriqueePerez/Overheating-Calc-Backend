CREATE DATABASE IF NOT EXISTS Overheating;

CREATE TABLE IF NOT EXISTS stores (
    `CR` VARCHAR(6) PRIMARY KEY NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `ciudad` VARCHAR(20) NOT NULL,
);

CREATE TABLE IF NOT EXISTS users (
    `id_usuario` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL
);

--timestamp yyyy--mm--dd hh:mm:ss 

CREATE TABLE IF NOT EXISTS data (
    `registro_id` INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `hora_de_registro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `CR` VARCHAR(6) NOT NULL,
    `id_usuario` INT UNSIGNED NOT NULL,
    `unidad` VARCHAR(20) NOT NULL,
    `refrigerante` enum('R22', 'R404a') NOT NULL,
    `presion_arranque` DOUBLE(7, 3) NOT NULL,
    `presion_paro` DOUBLE(7, 3) NOT NULL,
    `presion_succion` DOUBLE(7, 3) NOT NULL,
    `resistencia_pt1000` DOUBLE(8, 3) NOT NULL,
    `temp_tubo` DOUBLE(6, 2) NOT NULL,
    `temp_saturacion` DOUBLE(6, 2) NOT NULL,
    `temp_sobrecalentamiento` DOUBLE(6, 2) NOT NULL,
    `comentarios` TEXT,
);

