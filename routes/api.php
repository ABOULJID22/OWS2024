<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;

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

  Route::post('/users/add-friend/{userId}', [FriendController::class, 'addFriend']);
  Route::get('/user/{userId}/friends', [FriendController::class, 'getFriends']);
  Route::delete('/user/{userId}/friends/{friendId}', [FriendController::class,'deleteFriend']);
  Route::post('/users/{user}/update-photo', [UserController::class, 'updatePhoto']);



    Route::apiResource('/users', UserController::class);

});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

