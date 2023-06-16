CREATE DATABASE plantsrus;

CREATE TABLE plantinfo (
    plant_id SERIAL PRIMARY KEY,
    common_name VARCHAR(150),
    colors VARCHAR(200),
    geographical_area VARCHAR(150)
);