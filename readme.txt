cd laradock
docker-compose up -d nginx postgres pgadmin workspace

docker-compose exec workspace bash

DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=default
DB_USERNAME=default
DB_PASSWORD=secret

php artisan migrate:refresh --seed

enbale for morph
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS hstore;