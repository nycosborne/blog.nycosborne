<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/posts', PostController::class)->scoped([
        'post' => 'slug',
    ]);
//    Route::get('/categories/{categories}', [CategoryController::class, 'show']);
    Route::apiResource('/categories', CategoryController::class);
//    Route::apiResource('/categories', CategoryController::class)->scoped([
//        'categories' => 'slug',
//    ]);
//    Route::get('/posts/categories', [CategoryController::class]);
});



Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

