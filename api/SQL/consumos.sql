-- Tabela de registros de consumo
CREATE TABLE IF NOT EXISTS consumos (
    id SERIAL PRIMARY KEY,
    edicao_id INTEGER NOT NULL REFERENCES edicoes(id) ON DELETE CASCADE,
    number_of_cans INT NOT NULL
);