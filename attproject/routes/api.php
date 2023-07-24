<?php

use App\Enums\PermissionsEnum;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\AdTech\TagsController;
use App\Http\Controllers\AdTech\InvestigationSummaryController;
use App\Http\Controllers\AdTech\VendorListController;
use App\Http\Controllers\AdTech\TrackerListController;
use App\Http\Controllers\AdTech\PageUrlListController;
use App\Http\Controllers\AdTech\PageSectListController;

use App\Http\Controllers\AdTech\BusinessUnitController;
use App\Http\Controllers\AdTech\NoteController;
use App\Http\Controllers\AdTech\DraftController;
use App\Http\Controllers\AdTech\UserController;
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
        Route::get('user-roles', [UserController::class, 'roles']);
    });

    Route::group(['middleware' => ['permission:' . PermissionsEnum::MANAGE_UNIT->value]], function () {
        Route::resource('units', BusinessUnitController::class);
    });

    Route::group(['middleware' => ['permission:' . PermissionsEnum::INVESTIGATE->value]], function () {

        Route::resource('notes', NoteController::class);
        Route::resource('drafts', DraftController::class);

        Route::resource('tags', TagsController::class);
        Route::resource('investigation-summary', InvestigationSummaryController::class);

        Route::resource('vendors', VendorListController::class);
        Route::post('vendors/{itemId}/notes', [NoteController::class, 'createOnVendors']);
        Route::post('vendors/{itemId}/drafts', [DraftController::class, 'createOnVendors']);
        Route::post('vendors/save-all-drafts', [VendorListController::class, 'saveAllDrafts']);
        Route::post('vendors/clear-all-drafts', [VendorListController::class, 'clearAllDrafts']);
        Route::get('vendors-name', [VendorListController::class, 'vendorsName']);


        Route::resource('trackers', TrackerListController::class);
        Route::post('trackers/{itemId}/notes', [NoteController::class, 'createOnTrackers']);
        Route::post('trackers/{itemId}/drafts', [DraftController::class, 'createOntrackers']);
        Route::post('trackers/save-all-drafts', [TrackerListController::class, 'saveAllDrafts']);
        Route::post('trackers/clear-all-drafts', [TrackerListController::class, 'clearAllDrafts']);


        Route::resource('page-urls', PageUrlListController::class);
        Route::post('page-urls/{itemId}/notes', [NoteController::class, 'createOnPageUrls']);
        Route::post('page-urls/{itemId}/drafts', [DraftController::class, 'createOnPageUrls']);
        Route::post('page-urls/save-all-drafts', [PageUrlListController::class, 'saveAllDrafts']);
        Route::post('page-urls/clear-all-drafts', [PageUrlListController::class, 'clearAllDrafts']);


        Route::resource('page-sections', PageSectListController::class);
        Route::post('page-sections/{itemId}/notes', [NoteController::class, 'createOnPageSect']);
        Route::post('page-sections/{itemId}/drafts', [DraftController::class, 'createOnPageSect']);
        Route::post('page-sections/save-all-drafts', [PageSectListController::class, 'saveAllDrafts']);
        Route::post('page-sections/clear-all-drafts', [PageSectListController::class, 'clearAllDrafts']);
    });
});
