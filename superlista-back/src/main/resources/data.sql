-- 1) Usuarios
INSERT INTO usuario (username, password, nombre, apellido, email, rol, fecha_creacion) VALUES
  ('juanp',   '$2b$12$QDDnMK5a9./eBm0xHut1EOPmoeKyrOxiLXN5i7LAB0bXy2UaLodJu', 'Juan',  'Pérez', 'juan.perez@example.com',  'USER',  '2025-04-16 10:00:00'),
  ('mariaa',  '$2b$12$QDDnMK5a9./eBm0xHut1EOPmoeKyrOxiLXN5i7LAB0bXy2UaLodJu', 'María', 'García','maria.garcia@example.com','USER',  '2025-04-16 10:05:00'),
  ('admin01', '$2b$12$QDDnMK5a9./eBm0xHut1EOPmoeKyrOxiLXN5i7LAB0bXy2UaLodJu', 'Admin', 'Root',  'admin@superlista.com', 'ADMIN', '2025-04-16 10:10:00');


-- 2) Ingredientes
-- 1) Ingredientes (50 filas)
INSERT INTO ingrediente (id, nombre, categoria) VALUES
  (1,  'Tomate',          'VERDURAS'),
  (2,  'Lechuga',         'VERDURAS'),
  (3,  'Manzana',         'FRUTAS'),
  (4,  'Pollo',           'CARNE'),
  (5,  'Salmón',          'PESCADO'),
  (6,  'Lentejas',        'LEGUMBRES'),
  (7,  'Queso',           'LACTEOS'),
  (8,  'Pan',             'CEREALES'),
  (9,  'Almendras',       'FRUTOS_SECOS'),
  (10, 'AceiteOliva',     'GRASAS_ACEITES'),
  (11, 'Zanahoria',       'VERDURAS'),
  (12, 'Pepino',          'VERDURAS'),
  (13, 'Fresa',           'FRUTAS'),
  (14, 'Ternera',         'CARNE'),
  (15, 'Atún',            'PESCADO'),
  (16, 'Garbanzos',       'LEGUMBRES'),
  (17, 'Yogur',           'LACTEOS'),
  (18, 'Arroz',           'CEREALES'),
  (19, 'Nueces',          'FRUTOS_SECOS'),
  (20, 'Mantequilla',     'GRASAS_ACEITES'),
  (21, 'Cebolla',         'VERDURAS'),
  (22, 'Pimiento',        'VERDURAS'),
  (23, 'Plátano',         'FRUTAS'),
  (24, 'Cerdo',           'CARNE'),
  (25, 'Trucha',          'PESCADO'),
  (26, 'Frijoles',        'LEGUMBRES'),
  (27, 'Leche',           'LACTEOS'),
  (28, 'Quinoa',          'CEREALES'),
  (29, 'Avellanas',       'FRUTOS_SECOS'),
  (30, 'AceiteGirasol',   'GRASAS_ACEITES'),
  (31, 'Espinaca',        'VERDURAS'),
  (32, 'Brócoli',         'VERDURAS'),
  (33, 'Melocotón',       'FRUTAS'),
  (34, 'Cordero',         'CARNE'),
  (35, 'Mejillones',      'PESCADO'),
  (36, 'Soja',            'LEGUMBRES'),
  (37, 'QuesoCabra',      'LACTEOS'),
  (38, 'Cebada',          'CEREALES'),
  (39, 'Pistachos',       'FRUTOS_SECOS'),
  (40, 'AceiteCoco',      'GRASAS_ACEITES'),
  (41, 'Calabacín',       'VERDURAS'),
  (42, 'Berenjena',       'VERDURAS'),
  (43, 'Kiwi',            'FRUTAS'),
  (44, 'Pavo',            'CARNE'),
  (45, 'Bacalao',         'PESCADO'),
  (46, 'Lupino',          'LEGUMBRES'),
  (47, 'Kéfir',           'LACTEOS'),
  (48, 'Mijo',            'CEREALES'),
  (49, 'Anacardos',       'FRUTOS_SECOS'),
  (50, 'AceiteSésamo',    'GRASAS_ACEITES')
;

-- 2) Recetas (20 filas)
INSERT INTO receta (id, nombre) VALUES
  (1,  'Ensalada mixta'),
  (2,  'Pollo al horno'),
  (3,  'Lentejas estofadas'),
  (4,  'Arroz con verduras'),
  (5,  'Tortilla de patata'),
  (6,  'Guiso de ternera'),
  (7,  'Pasta al pesto'),
  (8,  'Sopa de pescado'),
  (9,  'Hamburguesa casera'),
  (10, 'Curry de garbanzos'),
  (11, 'Yogur con frutas'),
  (12, 'Quinoa bowl'),
  (13, 'Crema de brócoli'),
  (14, 'Sandwich de jamón'),
  (15, 'Mejillones al vapor'),
  (16, 'Ensalada de espinacas'),
  (17, 'Pescado a la plancha'),
  (18, 'Garbanzos fritos'),
  (19, 'Leche con avena'),
  (20, 'Mix de frutos secos')
;

-- 3) Relación Receta ↔ Ingrediente
INSERT INTO receta_ingredientes (id_receta, id_ingrediente) VALUES
  -- 1 Ensalada mixta
  (1, 1),(1, 2),(1, 3),(1, 11),(1, 12),
  -- 2 Pollo al horno
  (2, 4),(2, 10),(2, 20),(2, 21),
  -- 3 Lentejas estofadas
  (3, 6),(3, 21),(3, 22),(3, 16),
  -- 4 Arroz con verduras
  (4, 18),(4, 11),(4, 12),(4, 41),(4, 42),
  -- 5 Tortilla de patata
  (5, 8),(5, 21),(5, 20),
  -- 6 Guiso de ternera
  (6, 14),(6, 21),(6, 22),(6, 11),
  -- 7 Pasta al pesto
  (7, 8),(7, 31),(7, 9),(7, 29),
  -- 8 Sopa de pescado
  (8, 5),(8, 25),(8, 15),(8, 21),
  -- 9 Hamburguesa casera
  (9, 24),(9, 7),(9, 8),(9, 22),(9, 20),
  -- 10 Curry de garbanzos
  (10,16),(10,30),(10,21),(10,22),
  -- 11 Yogur con frutas
  (11,17),(11,13),(11,23),(11,33),
  -- 12 Quinoa bowl
  (12,28),(12,31),(12,32),(12,3),
  -- 13 Crema de brócoli
  (13,32),(13,21),(13,7),(13,27),
  -- 14 Sandwich de jamón
  (14,8),(14,24),(14,7),
  -- 15 Mejillones al vapor
  (15,35),(15,21),(15,20),
  -- 16 Ensalada de espinacas
  (16,31),(16,2),(16,3),(16,9),
  -- 17 Pescado a la plancha
  (17,45),(17,10),(17,21),
  -- 18 Garbanzos fritos
  (18,16),(18,30),(18,19),
  -- 19 Leche con avena
  (19,27),(19,48),
  -- 20 Mix de frutos secos
  (20,9),(20,19),(20,29),(20,49)
;


-- 5) Menús semanales
INSERT INTO menu_semanal (usuario_id) VALUES
  (1), -- para Juan
  (2)  -- para María
;

-- 6) Días de comida: un ejemplo abreviado para el menú 1
INSERT INTO dia_comida (dia, categoria, menu_semanal_id) VALUES
  ('LUNES',   'DESAYUNO', 1),
  ('LUNES',   'COMIDA',    1),
  ('LUNES',   'CENA',      1),
  ('MARTES',  'DESAYUNO',  1),
  ('MARTES',  'COMIDA',    1),
  ('MARTES',  'CENA',      1)
;

-- 7) Relación DíaComida ↔ Receta
INSERT INTO dia_comida_recetas (dia_comida_id, receta_id) VALUES
  (1, 1), -- Lunes desayuno: Ensalada
  (2, 2), -- Lunes comida: Pollo al horno
  (3, 3), -- Lunes cena: Lentejas
  (4, 1), -- Martes desayuno: Ensalada
  (5, 3), -- Martes comida: Lentejas
  (6, 2)  -- Martes cena: Pollo al horno
;

-- 8) Listas de la compra
INSERT INTO lista_compra (usuario_id) VALUES
  (1), -- lista de Juan
  (2)  -- lista de María
;

-- 9) Relación ListaCompra ↔ Ingrediente
INSERT INTO lista_compra_ingredientes (lista_compra_id, ingrediente_id) VALUES
  (1, 1), -- Juan necesita Tomate
  (1, 2), -- Juan necesita Lechuga
  (1, 4), -- Juan necesita Pollo
  (2, 3), -- María necesita Manzana
  (2, 6)  -- María necesita Lentejas
;
