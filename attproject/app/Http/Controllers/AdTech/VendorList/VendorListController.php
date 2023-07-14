<?php

namespace App\Http\Controllers\AdTech\VendorList;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AdTech\VendorListRequest;

use App\Repositories\AdTech\VendorListRepository;
use App\Traits\ResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

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

class VendorListController extends Controller
{
    /**
     * Response trait to handle return responses.
     */
    use ResponseTrait;

    /**
     * Tag Repository class.
     *
     * @var VendorListRepository
     */
    public $repository;

    public function __construct(VendorListRepository $repository)
    {
        $this->middleware('auth:api', ['except' => ['indexAll']]);
        $this->repository = $repository;
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
            $data = $this->repository->getAll($filters);
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
            $data = $this->repository->getPaginatedData($request->perPage);
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
            $data = $this->repository->searchTag($request->search, $request->perPage);
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
    public function store(TagRequest $request): JsonResponse
    {
        try {
            $tag = $this->repository->create($request->all());
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
            $data = $this->repository->getByID($id);
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
    public function update(TagRequest $request, $id): JsonResponse
    {
        try {
            $data = $this->repository->update($id, $request->all());
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
            $tag =  $this->repository->getByID($id);
            if (empty($tag)) {
                return $this->responseError(null, 'Tag Not Found', Response::HTTP_NOT_FOUND);
            }

            $deleted = $this->repository->delete($id);
            if (!$deleted) {
                return $this->responseError(null, 'Failed to delete the tag.', Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return $this->responseSuccess($tag, 'Tag Deleted Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
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
    public function vendorsName(): JsonResponse
    {
        try {
            $data = $this->repository->getVendorsName();
            return $this->responseSuccess($data, 'Tag List Fetched Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // public function saveAll(): JsonResponse
    // {
    //     try {
    //         $data = $this->repository->saveAll();
    //         return $this->responseSuccess($data, 'Tag Updated Successfully !');
    //     } catch (\Exception $e) {
    //         return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
    //     }
    // }
    public function saveAll(): JsonResponse
    {
        try {
            $data = $this->repository->saveAllDraft($itemId);
            return $this->responseSuccess($data, 'Tag Updated Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
