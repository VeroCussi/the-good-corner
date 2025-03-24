-- Borrar tablas en orden correcto ¿?
DROP TABLE IF EXISTS ad_tags;
DROP TABLE IF EXISTS ad;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Tags;

-- Tabla Tags
CREATE TABLE Tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);


-- Tabla Category (va en primer lugar)
CREATE TABLE Category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

-- Tabla ad ejercicio 1
CREATE TABLE ad (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    owner TEXT NOT NULL,
    price INTEGER NOT NULL,
    picture TEXT,
    location TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE CASCADE
);

-- Insertar categorías
INSERT INTO Category (name) VALUES
('Autre'),
('Vehicles'),
('Hifi');

-- Insertar tags
INSERT INTO Tags (name) VALUES
('Neuf'),
('Soldé');



-- Datos de ejemplo en la tabla ad
INSERT INTO ad (title, description, owner, price, picture, location, createdAt, category_id) VALUES
('Bike for sale', 'Lightweight city bike, in excellent condition, recently serviced.', 'john.doe@gmail.com', 120, 'https://example.com/bike1.jpg', 'Bordeaux', '2023-09-05T08:30:00.000Z', 2), -- Vehicles
('Vintage Guitar', 'Beautiful vintage acoustic guitar, warm tone, perfect for collectors.', 'music.lover@gmail.com', 350, 'https://example.com/guitar.jpg', 'Paris', '2023-09-06T14:15:30.000Z', 3), -- Hifi
('Gaming PC', 'High-performance gaming PC with RTX 3080, 32GB RAM, and 1TB SSD.', 'gamer123@gmail.com', 1500, 'https://example.com/pc.jpg', 'Lyon', '2023-09-07T17:45:20.000Z', 3), -- Hifi
('Sofa for sale', 'Comfortable 3-seater sofa, gray fabric, in perfect condition.', 'home.decor@gmail.com', 200, 'https://example.com/sofa.jpg', 'Paris', '2023-09-08T09:00:10.000Z', 1), -- Autre
('Road Bike', 'Carbon road bike, Shimano Ultegra groupset, very fast!', 'cyclist.paris@gmail.com', 900, 'https://example.com/roadbike.jpg', 'Bordeaux', '2023-09-09T16:22:00.000Z', 2), -- Vehicles
('iPhone 13 Pro', '256GB, graphite color, no scratches, comes with box and accessories.', 'tech.guy@gmail.com', 750, 'https://example.com/iphone.jpg', 'Lyon', '2023-09-10T11:50:40.000Z', 3), -- Hifi
('Car for sale', 'Well-maintained 2015 Toyota Corolla, 120,000 km, automatic.', 'car.seller@gmail.com', 8500, 'https://example.com/car.jpg', 'Paris', '2023-09-11T15:10:25.000Z', 2), -- Vehicles
('Smart TV', '55-inch 4K Smart TV, excellent condition, barely used.', 'tech.fan@gmail.com', 500, 'https://example.com/tv.jpg', 'Lyon', '2023-09-13T13:40:10.000Z', 3), -- Hifi
('MacBook Air', 'M1 chip, 512GB SSD, Space Gray, excellent battery life.', 'mac.user@gmail.com', 950, 'https://example.com/macbook.jpg', 'Paris', '2023-09-14T18:25:35.000Z', 3), -- Hifi
('Electric Scooter', 'Xiaomi electric scooter, 25km range, foldable.', 'escooter.fan@gmail.com', 300, 'https://example.com/scooter.jpg', 'Bordeaux', '2023-09-18T14:05:50.000Z', 2), -- Vehicles
('Vintage Watch', 'Rolex Submariner, 1978, in mint condition.', 'watch.collector@gmail.com', 5500, 'https://example.com/watch.jpg', 'Bordeaux', '2023-09-24T11:40:20.000Z', 1); -- Autre

SELECT * FROM ad JOIN Category ON ad.category_id = category.id

-- Tabla intermedia: relación many-to-many entre Ad y Tag
CREATE TABLE ad_tags (
    id INTEGER PRIMARY KEY,
    ad_id INTEGER NOT NULL,
    tags_id INTEGER NOT NULL,
    FOREIGN KEY (ad_id) REFERENCES ad(id) ON DELETE CASCADE,
    FOREIGN KEY (tags_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Asignar tags a los anuncios
INSERT INTO ad_tags (ad_id, tags_id) VALUES
(1, 1), -- Bike for sale (Neuf)
(2, 2), -- Vintage Guitar (Soldé)
(3, 1), -- Gaming PC (Neuf)
(4, 2), -- Sofa for sale (Soldé)
(5, 1), -- Road Bike (Neuf)
(6, 2), -- iPhone 13 Pro (Soldé)
(7, 2), -- Car for sale (Soldé)
(8, 1), -- Smart TV (Neuf)
(9, 1), -- MacBook Air (Neuf)
(10, 1), -- Electric Scooter (Neuf)
(11, 2); -- Vintage Watch (Soldé)




