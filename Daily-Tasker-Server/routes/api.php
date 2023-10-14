<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('signup', [AuthController::class, 'Signup'])->name('signup');
Route::post('send-verification-alert', [AuthController::class, 'sendVerification'])->name('sendVerification');
Route::post('login', [AuthController::class, 'Login'])->name('login');

Route::post('refresh-token', [AuthController::class, 'refreshToken'])->name('refreshToken');

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
