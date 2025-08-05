-- Tabela de edições de Red Bull
CREATE TABLE IF NOT EXISTS edicoes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    flavors VARCHAR(255),
    image_url VARCHAR(255)
);