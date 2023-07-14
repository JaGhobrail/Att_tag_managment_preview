<?php

namespace App\Repositories\AdTech;

use Illuminate\Support\Str;
use App\Helpers\UploadHelper;
use App\Interfaces\CrudInterface;
use App\Models\AdTech\Draft;
use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class DraftRepository implements CrudInterface
{
    /**
     * Authenticated User Instance.
     *
     * @var User
     */
    public User | null $user;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->user = Auth::guard()->user();
    }

    /**
     * Get All Draft.
     *
     * @return collections Array of Draft Collection
     */
    public function getAll(array $filters = []): Paginator
    {
        $query = Draft::query();

        foreach ($filters as $key => $value) {
            if ($key === 'dis') {
                continue;
            }
            $query->where($key, $value);
        }
        return  $query->orderBy('id', 'desc')->paginate(10);
    }

    /**
     * Get Paginated draft Data.
     *
     * @param int $pageNo
     * @return collections Array of draft Collection
     */
    public function getPaginatedData($perPage): Paginator
    {
        $perPage = isset($perPage) ? intval($perPage) : 12;
        return Draft::orderBy('id', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get Searchable draft Data with Pagination.
     *
     * @param int $pageNo
     * @return collections Array of draft Collection
     */
    public function searchTag($keyword, $perPage): Paginator
    {
        $perPage = isset($perPage) ? intval($perPage) : 10;

        return Draft::where('name', 'like', '%' . $keyword . '%')
            ->orWhere('description', 'like', '%' . $keyword . '%')
            ->orWhere('rate', 'like', '%' . $keyword . '%')
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    /**
     * Create New draft.
     *
     * @param array $data
     * @return object draft Object
     */
    public function create(array $data): Draft
    {
        return Draft::create($data);
    }

    /**
     * Delete draft.
     *
     * @param int $id
     * @return boolean true if deleted otherwise false
     */
    public function delete(int $id): bool
    {
        $draft = Draft::find($id);
        if (empty($draft)) {
            return false;
        }

        $draft->delete($draft);
        return true;
    }

    /**
     * Get draft Detail By ID.
     *
     * @param int $id
     * @return void
     */
    public function getByID(int $id): Draft|null
    {
        return Draft::find($id);
    }

    /**
     * Update draft By ID.
     *
     * @param int $id
     * @param array $data
     * @return object Updated draft Object
     */
    public function update(int $id, array $data): Draft|null
    {
        $draft = Draft::find($id);


        if (is_null($draft)) {
            return null;
        }

        // If everything is OK, then update.
        $draft->update($data);

        // Finally return the updated draft.
        return $this->getByID($draft->id);
    }
}
