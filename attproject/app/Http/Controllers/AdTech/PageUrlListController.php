<?php

namespace App\Http\Controllers\AdTech;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Repositories\AdTech\PageUrlListRepository;
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

class PageUrlListController extends Controller
{
    /**
     * Response trait to handle return responses.
     */
    use ResponseTrait;

    /**
     * Item Repository class.
     *
     * @var PageUrlListRepository
     */
    public $repository;

    public function __construct(PageUrlListRepository $repository)
    {
        $this->middleware('auth:api', ['except' => ['indexAll']]);
        $this->repository = $repository;
    }

    /**
     * @OA\GET(
     *     path="/api/items",
     *     items={"Items"},
     *     summary="Get Item List",
     *     description="Get Item List as Array",
     *     operationId="index",
     *     security={{"bearer":{}}},
     *     @OA\Response(response=200,description="Get Item List as Array"),
     *     @OA\Response(response=400, description="Bad request"),
     *     @OA\Response(response=404, description="Resource Not Found"),
     * )
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $filters = $request->all();
            $data = $this->repository->getAll($filters);
            return $this->responseSuccess($data, 'Item List Fetch Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\GET(
     *     path="/api/items/view/all",
     *     items={"Items"},
     *     summary="All Items - Publicly Accessible",
     *     description="All Items - Publicly Accessible",
     *     operationId="indexAll",
     *     @OA\Parameter(name="perPage", description="perPage, eg; 20", example=20, in="query", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="All Items - Publicly Accessible" ),
     *     @OA\Response(response=400, description="Bad request"),
     *     @OA\Response(response=404, description="Resource Not Found"),
     * )
     */
    public function indexAll(Request $request): JsonResponse
    {
        try {
            $data = $this->repository->getPaginatedData($request->perPage);
            return $this->responseSuccess($data, 'Item List Fetched Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\GET(
     *     path="/api/items/view/search",
     *     items={"Items"},
     *     summary="All Items - Publicly Accessible",
     *     description="All Items - Publicly Accessible",
     *     operationId="search",
     *     @OA\Parameter(name="perPage", description="perPage, eg; 20", example=20, in="query", @OA\Schema(type="integer")),
     *     @OA\Parameter(name="search", description="search, eg; Test", example="Test", in="query", @OA\Schema(type="string")),
     *     @OA\Response(response=200, description="All Items - Publicly Accessible" ),
     *     @OA\Response(response=400, description="Bad request"),
     *     @OA\Response(response=404, description="Resource Not Found"),
     * )
     */
    public function search(Request $request): JsonResponse
    {
        try {
            $data = $this->repository->searchitem($request->search, $request->perPage);
            return $this->responseSuccess($data, 'Item List Fetched Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\POST(
     *     path="/api/items",
     *     items={"Items"},
     *     summary="Create New Item",
     *     description="Create New Item",
     *     operationId="store",
     *     @OA\RequestBody(
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="title", type="string", example="Item 1"),
     *              @OA\Property(property="description", type="string", example="Description"),
     *              @OA\Property(property="price", type="integer", example=10120),
     *              @OA\Property(property="image", type="string", example=""),
     *          ),
     *      ),
     *      security={{"bearer":{}}},
     *      @OA\Response(response=200, description="Create New Item" ),
     *      @OA\Response(response=400, description="Bad request"),
     *      @OA\Response(response=404, description="Resource Not Found"),
     * )
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $item = $this->repository->create($request->all());
            return $this->responseSuccess($item, 'New Item Created Successfully !');
        } catch (\Exception $exception) {
            return $this->responseError(null, $exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\GET(
     *     path="/api/items/{id}",
     *     items={"Items"},
     *     summary="Show Item Details",
     *     description="Show Item Details",
     *     operationId="show",
     *     security={{"bearer":{}}},
     *     @OA\Parameter(name="id", description="id, eg; 1", required=true, in="path", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Show Item Details"),
     *     @OA\Response(response=400, description="Bad request"),
     *     @OA\Response(response=404, description="Resource Not Found"),
     * )
     */
    public function show($id): JsonResponse
    {
        try {
            $data = $this->repository->getByID($id);
            if (is_null($data)) {
                return $this->responseError(null, 'Item Not Found', Response::HTTP_NOT_FOUND);
            }

            return $this->responseSuccess($data, 'Item Details Fetch Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\PUT(
     *     path="/api/items/{id}",
     *     items={"Items"},
     *     summary="Update Item",
     *     description="Update Item",
     *     @OA\Parameter(name="id", description="id, eg; 1", required=true, in="path", @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="title", type="string", example="Item 1"),
     *              @OA\Property(property="description", type="string", example="Description"),
     *              @OA\Property(property="price", type="integer", example=10120),
     *              @OA\Property(property="image", type="string", example=""),
     *          ),
     *      ),
     *     operationId="update",
     *     security={{"bearer":{}}},
     *     @OA\Response(response=200, description="Update Item"),
     *     @OA\Response(response=400, description="Bad request"),
     *     @OA\Response(response=404, description="Resource Not Found"),
     * )
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $data = $this->repository->update($id, $request->all());
            if (is_null($data))
                return $this->responseError(null, 'Item Not Found', Response::HTTP_NOT_FOUND);

            return $this->responseSuccess($data, 'Item Updated Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\DELETE(
     *     path="/api/items/{id}",
     *     items={"Items"},
     *     summary="Delete Item",
     *     description="Delete Item",
     *     operationId="destroy",
     *     security={{"bearer":{}}},
     *     @OA\Parameter(name="id", description="id, eg; 1", required=true, in="path", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Delete Item"),
     *     @OA\Response(response=400, description="Bad request"),
     *     @OA\Response(response=404, description="Resource Not Found"),
     * )
     */
    public function destroy($id): JsonResponse
    {
        try {
            $item =  $this->repository->getByID($id);
            if (empty($item)) {
                return $this->responseError(null, 'Item Not Found', Response::HTTP_NOT_FOUND);
            }

            $deleted = $this->repository->delete($id);
            if (!$deleted) {
                return $this->responseError(null, 'Failed to delete the item.', Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return $this->responseSuccess($item, 'Item Deleted Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @OA\GET(
     *     path="/api/items",
     *     items={"Items"},
     *     summary="Get Item List",
     *     description="Get Item List as Array",
     *     operationId="index",
     *     security={{"bearer":{}}},
     *     @OA\Response(response=200,description="Get Item List as Array"),
     *     @OA\Response(response=400, description="Bad request"),
     *     @OA\Response(response=404, description="Resource Not Found"),
     * )
     */

    public function saveAllDrafts(): JsonResponse
    {
        try {
            $data = $this->repository->saveAllDrafts();
            return $this->responseSuccess($data, 'Item Updated Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function clearAllDrafts(): JsonResponse
    {
        try {
            $data = $this->repository->clearAllDrafts();
            return $this->responseSuccess($data, 'Item Updated Successfully !');
        } catch (\Exception $e) {
            return $this->responseError(null, $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
