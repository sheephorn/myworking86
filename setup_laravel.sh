#!/bin/bash
set -e

echo "Starting Laravel + Inertia setup..."

# Check PHP
if ! command -v php &> /dev/null; then
    echo "PHP is not installed. Please rebuild the devcontainer."
    exit 1
fi

# Check Composer
if ! command -v composer &> /dev/null; then
    echo "Composer is not installed. Please rebuild the devcontainer."
    exit 1
fi

# Create a new Laravel project in a temporary directory
echo "Creating Laravel project..."
composer create-project laravel/laravel:^11.0 temp_laravel

# Move files from temp_laravel to root
echo "Moving Laravel files..."

# Remove the default resources/js and css from temp_laravel as we have our own
rm -rf temp_laravel/resources/js
rm -rf temp_laravel/resources/css
rm -rf temp_laravel/resources/views/welcome.blade.php
rm -rf temp_laravel/routes/web.php
rm -f temp_laravel/vite.config.js
rm -f temp_laravel/package.json
rm -f temp_laravel/tsconfig.json

# Move contents (excluding dots)
cp -rT temp_laravel/ .
rm -rf temp_laravel

# Restore static assets to public directory
echo "Restoring static assets..."
if [ -d "_legacy/static" ]; then
    cp -r _legacy/static/* public/
else
    echo "Warning: _legacy/static directory not found. Static assets might be missing."
fi

# Install Inertia server-side
echo "Installing Inertia server-side..."
composer require inertiajs/inertia-laravel

# Publish Inertia middleware
php artisan inertia:middleware

echo "Configuring Inertia Middleware..."

# We need to register \App\Http\Middleware\HandleInertiaRequests::class
# Check if bootstrap/app.php exists (Laravel 11)
if [ -f bootstrap/app.php ]; then
    cat <<EOF > bootstrap/app.php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\HandleInertiaRequests;

return Application::configure(base_path())
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware \$middleware) {
        \$middleware->web(append: [
            HandleInertiaRequests::class,
        ]);
    })
    ->withExceptions(function (Exceptions \$exceptions) {
        //
    })->create();
EOF
else
    echo "Warning: verify Kernel.php for Inertia middleware registration."
fi

# Install Node dependencies
echo "Installing Node dependencies..."
# Use legacy peer deps if needed, but package.json now uses React 18 which is safe.
npm install

echo "Setup complete! Run 'npm run dev' and 'php artisan serve' to start."
