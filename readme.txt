![photo_5792069686115024972_y](https://github.com/user-attachments/assets/a0d04429-c7aa-459b-8a50-c923526161b0)
![photo_5792069686115024983_y](https://github.com/user-attachments/assets/21f9b3fd-9ca7-4fd5-8340-a33b04dd796c)
![photo_6039534040874336988_y](https://github.com/user-attachments/assets/3ba2d2ad-51f1-4a5c-b893-7351185b6978)



cd laradock
docker-compose up -d nginx postgres pgadmin workspace

docker-compose exec workspace bash

DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=default
DB_USERNAME=default
DB_PASSWORD=secret

php artisan migrate:fresh --path=/database/migrations/2023_08_01_223641_ad_tech_installation.php
php artisan db:seed

php artisan migrate:refresh --seed

enbale for morph
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS hstore;
