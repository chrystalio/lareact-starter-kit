<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\RolePermissionController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::impersonate();

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }

    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('admin')->group(function () {
        Route::resource('roles', RoleController::class)->middleware('can:role.view');
        Route::get('/users', [UserController::class, 'index'])->name('admin.users.index')->middleware('can:user.view');
        Route::put('/users/{user}/roles', [UserController::class, 'updateRoles'])->name('admin.users.updateRoles')->middleware('can:user.update');
        Route::put('/users/{user}/roles', [UserController::class, 'updateRoles'])->name('admin.users.updateRoles')->middleware('can:user.edit');

        Route::get('/roles/{role}/permissions', [RolePermissionController::class, 'index'])->middleware('can:rolepermission.view')->name('admin.roles.permissions.index');
        Route::post('/roles/{role}/permissions', [RolePermissionController::class, 'update'])->middleware('can:rolepermission.update')->name('admin.roles.permissions.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
