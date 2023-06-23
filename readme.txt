cd laradock
docker-compose up -d nginx postgres pgadmin workspace

docker-compose exec workspace bash

DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=default
DB_USERNAME=default
DB_PASSWORD=secret

php artisan make:migration 