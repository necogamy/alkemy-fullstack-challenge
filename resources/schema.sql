
-- create extension if not exists "uuid-ossp";
CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE operations (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES users(id),
    amount money,
    date DATE,
    type CHAR(7),
    category CHAR(20)
);
