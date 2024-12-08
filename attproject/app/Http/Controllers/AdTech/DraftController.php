<?php

namespace App\Http\Controllers\AdTech;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\AdTech\VendorList;
use App\Models\AdTech\TrackerList;
use App\Models\AdTech\PageSectList;
use App\Models\AdTech\PageUrlList;
use App\Models\AdTech\Draft;

use App\Repositories\AdTech\DraftRepository;
use App\Traits\ResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Auth;

/**
 * @OA\Info(
 *     description="API Documentation - Basic CRUD Laravel",
 *     version="1.0.0",
 *     title="Basic CRUD Laravel API Documentation",
 *     @OA\Contact(
 *         email="manirujjamanakash@gmail.com"
 *     ),
 *     @OA\License(
 *         name="GPL2",
 *         url="https://devsenv.com"
 *     )
 * )
 */

class DraftController extends Controller
{
    /**
     * Response trait to handle return responses.
     */
    use ResponseTrait;

    /**
     * Tag Repository class.
     *
     * @var DraftRepository
     */
    public $tagsRepository;

    public function __construct(DraftRepository $tagsRepository)
    {
        $this->middleware('auth:api', ['except' => ['indexAll']]);
        $this->tagsRepository = $tagsRepository;
    }

    /**
     * @OA\GET(
     *     path="/api/tags",
     *     tags={"Tags"},
     *     summary="Get Tag List",
     *     description="Get Tag List as Array",
     *     operationId="index",
     *     security={{"bearer":{}}},
     *     @OA\Response(response=200,description="Get Tag List as Array"),
     *     @OA\Response(response=400, description="Bad request"),
     *     @OA\Response(response=404, description="Resource Not Found"),
     * )
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $filters = $request->all();
            $data = $this->tagsRepository->getAll($filters);
            return $this->responseSuccess($data, 'Tag List Fetch Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\GET(
     *     path="/api/tags/view/all",
     *     tags={"Tags"},
     *     summary="All Tags - Publicly Accessible",
     *     description="All Tags - Publicly Accessible",
     *     operationId="indexAll",
     *     @OA\Parameter(name="perPage", description="perPage, eg; 20", example=20, in="query", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="All Tags - Publicly Accessible" ),
     *     @OA\Response(response=400, description="Bad request"),
     *     @OA\Response(response=404, description="Resource Not Found"),
     * )
     */
    public function indexAll(Request $request): JsonResponse
    {
        try {
            $data = $this->tagsRepository->getPaginatedData($request->perPage);
            return $this->responseSuccess($data, 'Tag List Fetched Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\GET(
     *     path="/api/tags/view/search",
     *     tags={"Tags"},
     *     summary="All Tags - Publicly Accessible",
     *     description="All Tags - Publicly Accessible",
     *     operationId="search",
     *     @OA\Parameter(name="perPage", description="perPage, eg; 20", example=20, in="query", @OA\Schema(type="integer")),
     *     @OA\Parameter(name="search", description="search, eg; Test", example="Test", in="query", @OA\Schema(type="string")),
     *     @OA\Response(response=200, description="All Tags - Publicly Accessible" ),
     *     @OA\Response(response=400, description="Bad request"),
     *     @OA\Response(response=404, description="Resource Not Found"),
     * )
     */
    public function search(Request $request): JsonResponse
    {
        try {
            $data = $this->tagsRepository->searchTag($request->search, $request->perPage);
            return $this->responseSuccess($data, 'Tag List Fetched Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\POST(
     *     path="/api/tags",
     *     tags={"Tags"},
     *     summary="Create New Tag",
     *     description="Create New Tag",
     *     operationId="store",
     *     @OA\RequestBody(
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="title", type="string", example="Tag 1"),
     *              @OA\Property(property="description", type="string", example="Description"),
     *              @OA\Property(property="price", type="integer", example=10120),
     *              @OA\Property(property="image", type="string", example=""),
     *          ),
     *      ),
     *      security={{"bearer":{}}},
     *      @OA\Response(response=200, description="Create New Tag" ),
     *      @OA\Response(response=400, description="Bad request"),
     *      @OA\Response(response=404, description="Resource Not Found"),
     * )
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $tag = $this->tagsRepository->create($request->all());
            return $this->responseSuccess($tag, 'New Tag Created Successfully !');
        } catch (\Exception $exception) {
            return $this->responseError(null, $exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\GET(
     *     path="/api/tags/{id}",
     *     tags={"Tags"},
     *     summary="Show Tag Details",
     *     description="Show Tag Details",
     *     operationId="show",
     *     security={{"bearer":{}}},
     *     @OA\Parameter(name="id", description="id, eg; 1", required=true, in="path", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Show Tag Details"),
     *     @OA\Response(response=400, description="Bad request"),
     *     @OA\Response(response=404, description="Resource Not Found"),
     * )
     */
    public function show($id): JsonResponse
    {
        try {
            $data = $this->tagsRepository->getByID($id);
            if (is_null($data)) {
                return $this->responseError(null, 'Tag Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($data, 'Tag Details Fetch Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\PUT(
     *     path="/api/tags/{id}",
     *     tags={"Tags"},
     *     summary="Update Tag",
     *     description="Update Tag",
     *     @OA\Parameter(name="id", description="id, eg; 1", required=true, in="path", @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="title", type="string", example="Tag 1"),
     *              @OA\Property(property="description", type="string", example="Description"),
     *              @OA\Property(property="price", type="integer", example=10120),
     *              @OA\Property(property="image", type="string", example=""),
     *          ),
     *      ),
     *     operationId="update",
     *     security={{"bearer":{}}},
     *     @OA\Response(response=200, description="Update Tag"),
     *     @OA\Response(response=400, description="Bad request"),
     *     @OA\Response(response=404, description="Resource Not Found"),
     * )
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $data = $this->tagsRepository->update($id, $request->all());
            if (is_null($data))
                return $this->responseError(null, 'Tag Not Found', Response::HTTP_NOT_FOUND);

            return $this->responseSuccess($data, 'Tag Updated Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\DELETE(
     *     path="/api/tags/{id}",
     *     tags={"Tags"},
     *     summary="Delete Tag",
     *     description="Delete Tag",
     *     operationId="destroy",
     *     security={{"bearer":{}}},
     *     @OA\Parameter(name="id", description="id, eg; 1", required=true, in="path", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Delete Tag"),
     *     @OA\Response(response=400, description="Bad request"),
     *     @OA\Response(response=404, description="Resource Not Found"),
     * )
     */
    public function destroy($id): JsonResponse
    {
        try {
            $tag =  $this->tagsRepository->getByID($id);
            if (empty($tag)) {
                return $this->responseError(null, 'Tag Not Found', Response::HTTP_NOT_FOUND);
            }

            $deleted = $this->tagsRepository->delete($id);
            if (!$deleted) {
                return $this->responseError(null, 'Failed to delete the tag.', Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return $this->responseSuccess($tag, 'Tag Deleted Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function createOnVendors(Request $request, $itemId): JsonResponse
    {
        try {
            $vendor = VendorList::findOrFail($itemId);
            $draft = new Draft();
            $draft->draftable_type = VendorList::class;
            $draft->draftable_id = $vendor->id;
            $draft->body = json_encode($request->all());
            $draft->user_id = Auth::id();
            // dd($request->all());
            $draft->save();
            $draft->load(['user', 'user.roles']);
            return $this->responseSuccess($draft, 'New Tag Created Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function createOnTrackers(Request $request, $itemId): JsonResponse
    {
        try {
            $vendor = TrackerList::findOrFail($itemId);
            $draft = new Draft();
            $draft->draftable_type = TrackerList::class;
            $draft->draftable_id = $vendor->id;
            $draft->body = json_encode($request->all());
            $draft->user_id = Auth::id();
            // dd($request->all());
            $draft->save();
            $draft->load(['user', 'user.roles']);
            return $this->responseSuccess($draft, 'New Tag Created Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // public function createOnTrackers(Request $request, $itemId): JsonResponse
    // {
    //     try {
    //         $vendor = TrackerList::findOrFail($itemId);

    //         $draft = new Draft();
    //         $draft->draftable_type = TrackerList::class;
    //         $draft->draftable_id = $vendor->id;
    //         $draft->body = $request->input('body');
    //         $draft->domain = $request->input('domain');
    //         $draft->user_id = Auth::id();
    //         $draft->save();
    //         return $this->responseSuccess($draft, 'New Tag Created Successfully !');
    //     } catch (\Exception $e) {
    //         return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
    //     }
    // }
    public function createOnPageSect(Request $request, $itemId): JsonResponse
    {
        try {
            $vendor = PageSectList::findOrFail($itemId);
            $draft = new Draft();
            $draft->draftable_type = PageSectList::class;
            $draft->draftable_id = $vendor->id;
            $draft->body = json_encode($request->all());
            $draft->user_id = Auth::id();
            // dd($request->all());
            $draft->save();
            $draft->load(['user', 'user.roles']);
            return $this->responseSuccess($draft, 'New Tag Created Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    // public function createOnPageSect(Request $request, $itemId): JsonResponse
    // {
    //     try {
    //         $vendor = PageSectList::findOrFail($itemId);

    //         $draft = new Draft();
    //         $draft->draftable_type = PageSectList::class;
    //         $draft->draftable_id = $vendor->id;
    //         $draft->body = $request->input('body');
    //         $draft->domain = $request->input('domain');
    //         $draft->user_id = Auth::id();
    //         $draft->save();
    //         return $this->responseSuccess($draft->with(['user', 'user.roles']), 'New Tag Created Successfully !');
    //     } catch (\Exception $e) {
    //         return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
    //     }
    // }

    public function createOnPageUrls(Request $request, $itemId): JsonResponse
    {
        try {
            $vendor = PageUrlList::findOrFail($itemId);
            $draft = new Draft();
            $draft->draftable_type = PageUrlList::class;
            $draft->draftable_id = $vendor->id;
            $draft->body = json_encode($request->all());
            $draft->user_id = Auth::id();
            // dd($request->all());
            $draft->save();
            $draft->load(['user', 'user.roles']);
            return $this->responseSuccess($draft, 'New Tag Created Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    // public function createOnPageUrls(Request $request, $itemId): JsonResponse
    // {
    //     try {
    //         $vendor = PageUrlList::findOrFail($itemId);

    //         $draft = new Draft();
    //         $draft->draftable_type = PageUrlList::class;
    //         $draft->draftable_id = $vendor->id;
    //         $draft->body = $request->input('body');
    //         $draft->domain = $request->input('domain');
    //         $draft->user_id = Auth::id();
    //         $draft->save();
    //         return $this->responseSuccess($draft, 'New Tag Created Successfully !');
    //     } catch (\Exception $e) {
    //         return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
    //     }
    // }

    // Route::post('vendros/{trackerId}/drafts',[DraftController::class,'createOnTrackers']);
    // Route::post('vendros/{pageSectionId}/drafts',[DraftController::class,'createOnPageSections']);
    // Route::post('vendros/{pageUrlId}/drafts',[DraftController::class,'createOnPageUrls']);

}
