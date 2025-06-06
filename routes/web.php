<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\RolePermissionController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('admin')->group(function () {
        Route::resource('roles', RoleController::class);
        Route::get('/users', [UserController::class, 'index'])->name('admin.users.index');
        Route::put('/users/{user}/roles', [UserController::class, 'updateRoles'])->name('admin.users.updateRoles');

        Route::get('/roles/{role}/permissions', [RolePermissionController::class, 'index']);
        Route::post('/roles/{role}/permissions', [RolePermissionController::class, 'update']);

    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
