<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Products\ProductsController;
use App\Http\Controllers\tags\TagsController;
use App\Http\Controllers\InvestigationSummary\InvestigationSummaryController;
use App\Http\Controllers\PageUrlList\PageUrlListController;
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
Route::group([
    'middleware' => 'api'
], function ($router) {

    /**
     * Authentication Module
     */
    Route::group(['prefix' => 'auth'], function() {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('me', [AuthController::class, 'me']);
    });



    /**
     * Tags Module
     */
    Route::resource('tags', TagsController::class);
    Route::get('tags/view/all', [TagsController::class, 'indexAll']);
    Route::get('tags/view/search', [TagsController::class, 'search']);

    Route::resource('investigation-summary', InvestigationSummaryController::class);
    Route::get('investigation-summary/view/all', [InvestigationSummaryController::class, 'indexAll']);
    Route::get('investigation-summary/view/search', [InvestigationSummaryController::class, 'search']);

    Route::resource('page-url-list', PageUrlListController::class);
    Route::get('page-url-list/view/all', [PageUrlListController::class, 'indexAll']);
    Route::get('page-url-list/view/search', [PageUrlListController::class, 'search']);

});

