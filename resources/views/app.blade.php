<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#FFD93D">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Tailwind CSS (if not bundled) - but we use Vite -->
        <!-- Legacy CDN script was used, but for Laravel+Inertia we should use Vite build. -->
        <!-- However, the prompt says "current screen behavior". Current uses CDN via index.html. -->
        <!-- To use CDN with Inertia, we can include it here. But ideally we migrate to npm-based Tailwind. -->
        <!-- Given the user asked for Laravel backend, I will setup Vite properly. -->

        @viteReactRefresh
        @vite(['resources/js/app.tsx', 'resources/css/app.css'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
