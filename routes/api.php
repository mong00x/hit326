<?php
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CheckoutController;
// TODO: use App\Http\Controllers\OrderController;


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
// Public routes: anyone can access these routes
// Route::resource('products', ProductController::class);

// Route::put('products/{id}', [ProductController::class, 'update']);
Route::post('/register', [AuthController::class, 'register']); 
Route::post('/login', [AuthController::class, 'login']); 
Route::post('/checkout', [CheckoutController::class, 'store']); 

Route::get('/products', [ProductController::class, 'index']); 
Route::get('/products/{id}', [ProductController::class, 'show']); 

// TODO: checkout -> order Route::resource('order', OrderController::class); Order CRUD


// test apis: temp public access


// Protected routes: only authenticated users(admins) can access with token
Route::group(['middleware'=>['auth:sanctum']], function(){
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('products/{id}', [ProductController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']); 
    Route::delete('products/{id}', [ProductController::class, 'destroy']);

});

// Route::get('/products', [ProductController::class, 'index']); 
// // get '/products' will routes to ProductController with index method as default

// Route::post('/products', [ProductController::class, 'store']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
