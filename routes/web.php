<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/quiz', function () {
    return Inertia::render('Quiz');
});

Route::get('/result', function () {
    return Inertia::render('Result');
});

Route::get('/history', function () {
    return Inertia::render('History');
});

Route::get('/settings', function () {
    return Inertia::render('Settings');
});

Route::get('/gacha', function () {
    return Inertia::render('Gacha');
});

Route::get('/registration', function () {
    return Inertia::render('Registration');
});
