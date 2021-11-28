CREATE DATABASE IF NOT EXISTS widis;
USE widis;
CREATE TABLE courier
(
    id           INTEGER PRIMARY KEY,
    max_capacity INTEGER NOT NULL,
    current_load INTEGER DEFAULT 0
);
