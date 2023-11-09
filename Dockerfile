# Stage 1: Composer
FROM composer:2 AS composer
WORKDIR /app
COPY . /app
RUN composer install --no-interaction --optimize-autoloader

# Stage 2: PHP
FROM php:8.1-alpine

# Install system dependencies using apk
RUN apk --update add \
    icu-dev \
    unzip \
    zip \
    libzip-dev \
    libpng-dev \
    jpeg-dev \
    freetype-dev \
    oniguruma-dev \
    libxml2-dev \
    postgresql-dev

# Clear cache
RUN rm -rf /var/cache/apk/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Set the working directory to the Laravel application root
WORKDIR /var/www/html

# Copy files from the Composer stage
COPY --from=composer /app /var/www/html

# Set permissions for Laravel storage and bootstrap/cache directories
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 8000 (adjust as needed)
EXPOSE 8000

# Start Laravel application
CMD php artisan serve --host=0.0.0.0 --port=8000
