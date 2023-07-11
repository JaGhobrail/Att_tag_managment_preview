<?php

use App\Enums\PermissionsEnum;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\AdTech\tags\TagsController;
use App\Http\Controllers\AdTech\InvestigationSummary\InvestigationSummaryController;
use App\Http\Controllers\AdTech\PageUrlList\PageUrlListController;
use App\Http\Controllers\AdTech\PageSectList\PageSectListController;
use App\Http\Controllers\AdTech\TrackerList\TrackerListController;
use App\Http\Controllers\AdTech\VendorList\VendorListController;
use App\Http\Controllers\AdTech\Unit\UnitController;
use App\Http\Controllers\AdTech\Note\NoteController;
use App\Http\Controllers\AdTech\User\UserController;
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
    Route::group(['prefix' => 'auth'], function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('me', [AuthController::class, 'me']);
    });

    // Route::get('vendors/view/all', [VendorListController::class, 'indexAll']);
    // Route::get('vendors/view/search', [VendorListController::class, 'search']);



    Route::group(['middleware' => ['permission:' . PermissionsEnum::MANAGE_USER->value]], function () {
        Route::resource('users', UserController::class);
    });

    Route::group(['middleware' => ['permission:' . PermissionsEnum::MANAGE_UNIT->value]], function () {
        Route::resource('units', UnitController::class);
    });

    Route::group(['middleware' => ['permission:' . PermissionsEnum::INVESTIGATE->value]], function () {

        Route::resource('tags', TagsController::class);
        Route::resource('investigation-summary', InvestigationSummaryController::class);

        Route::resource('vendors', VendorListController::class);
        Route::post('vendors/{itemId}/notes', [NoteController::class, 'createOnVendors']);
        Route::get('vendors-name', [VendorListController::class, 'vendorsName']);

        Route::resource('trackers', TrackerListController::class);
        Route::post('trackers/{itemId}/notes', [NoteController::class, 'createOnTrackers']);

        Route::resource('page-urls', PageUrlListController::class);
        Route::post('page-urls/{itemId}/notes', [NoteController::class, 'createOnPageUrls']);


        Route::resource('page-sections', PageSectListController::class);
        Route::post('page-sections/{itemId}/notes', [NoteController::class, 'createOnPageSect']);
    });
});
