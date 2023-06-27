<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\AdTech\tags\TagsController;
use App\Http\Controllers\AdTech\InvestigationSummary\InvestigationSummaryController;
use App\Http\Controllers\AdTech\PageUrlList\PageUrlListController;
use App\Http\Controllers\AdTech\PageSectList\PageSectListController;
use App\Http\Controllers\AdTech\TrackerList\TrackerListController;
use App\Http\Controllers\AdTech\VendorList\VendorListController;
use App\Http\Controllers\AdTech\Note\NoteController;
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

    Route::resource('page-urls', PageUrlListController::class);
    Route::get('page-urls/view/all', [PageUrlListController::class, 'indexAll']);
    Route::get('page-urls/view/search', [PageUrlListController::class, 'search']);

    Route::resource('page-sections', PageSectListController::class);
    Route::get('page-sections/view/all', [PageSectListController::class, 'indexAll']);
    Route::get('page-sections/view/search', [PageSectListController::class, 'search']);

    Route::resource('trackers', TrackerListController::class);
    Route::get('trackers/view/all', [TrackerListController::class, 'indexAll']);
    Route::get('trackers/view/search', [TrackerListController::class, 'search']);

    Route::resource('vendors', VendorListController::class);
    Route::get('vendors/view/all', [VendorListController::class, 'indexAll']);
    Route::get('vendors/view/search', [VendorListController::class, 'search']);

    Route::resource('notes', NoteController::class);
    Route::get('notes/view/all', [NoteController::class, 'indexAll']);
    Route::get('notes/view/search', [NoteController::class, 'search']);

});

