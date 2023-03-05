<?php

use App\Http\Controllers\Api\AuthController;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StorekeeperController;


use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/login', [AuthController::class, 'loginUser']);

Route::middleware('auth:sanctum')->group(function () {
    /* auth all */
    Route::apiResource('categories',CategoryController::class);
    Route::apiResource('providers',ProviderController::class);
    Route::apiResource('products',ProductController::class);
    /* auth admin  */
    Route::apiResource('storekeepers',StorekeeperController::class);
});
