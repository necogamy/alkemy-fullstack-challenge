
-- create extension if not exists "uuid-ossp";
CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE operations (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES users(id) NOT NULL,
    amount money,
    type VARCHAR(7),
    category VARCHAR(20),
    date DATE,
    concept VARCHAR(50)
);
