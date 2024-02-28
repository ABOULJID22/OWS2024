<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\ImageController;
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

    Route::apiResource('/users', UserController::class);
    Route::post('/users/{user}/update-photo', [UserController::class, 'updatePhoto']);
// Dans routes/web.php ou routes/api.php
/* Route::get('/images/{filename}', [ImageController::class,'show']);
 */
Route::get('uploads/{file}', function (string $file) {
    return Storage::disk('uploads')->download($file);
})
    ->where(['file' => '\w[0-9a-zA-Z-_.]+'])
    ->name('uploads.download')
    ->middleware('signed');

   /*  Route::get('files/{filename}', function (string $filename) {
        // Do your magic to check if the current user is allowed to access that file

        // Do your magic to determine the full path of the file
        $fullPath = 'uploads/' . $filename;  // Utilisez le chemin relatif à partir du dossier storage/app/public/

        // Once we have the full path, we can stream the contents of the file to the client
        return Storage::response($fullPath);
    })->where('filename', '.*'); */
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

