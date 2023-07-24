<?php

namespace App\Repositories\AdTech;

use Illuminate\Support\Str;
use App\Helpers\UploadHelper;
use App\Interfaces\CrudInterface;
use App\Models\AdTech\BusinessUnit;
use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class BusinessUnitRepository implements CrudInterface
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
     * Get All BusinessUnit.
     *
     * @return collections Array of BusinessUnit Collection
     */
    public function getAll(array $filters = []): Paginator
    {
        $query = BusinessUnit::query();

        foreach ($filters as $key => $value) {
            if ($key === 'dis') {
                continue;
            }
            $query->where($key, $value);
        }
        return  $query->orderBy('id', 'desc')->paginate(10);
    }

    /**
     * Get Paginated note Data.
     *
     * @param int $pageNo
     * @return collections Array of note Collection
     */
    public function getPaginatedData($perPage): Paginator
    {
        $perPage = isset($perPage) ? intval($perPage) : 12;
        return BusinessUnit::orderBy('id', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get Searchable note Data with Pagination.
     *
     * @param int $pageNo
     * @return collections Array of note Collection
     */
    public function searchTag($keyword, $perPage): Paginator
    {
        $perPage = isset($perPage) ? intval($perPage) : 10;

        return BusinessUnit::where('name', 'like', '%' . $keyword . '%')
            ->orWhere('description', 'like', '%' . $keyword . '%')
            ->orWhere('rate', 'like', '%' . $keyword . '%')
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    /**
     * Create New note.
     *
     * @param array $data
     * @return object note Object
     */
    public function create(array $data): BusinessUnit
    {
        return BusinessUnit::create($data);
    }

    /**
     * Delete note.
     *
     * @param int $id
     * @return boolean true if deleted otherwise false
     */
    public function delete(int $id): bool
    {
        $note = BusinessUnit::find($id);
        if (empty($note)) {
            return false;
        }

        $note->delete($note);
        return true;
    }

    /**
     * Get note Detail By ID.
     *
     * @param int $id
     * @return void
     */
    public function getByID(int $id): BusinessUnit|null
    {
        return BusinessUnit::find($id);
    }

    /**
     * Update note By ID.
     *
     * @param int $id
     * @param array $data
     * @return object Updated note Object
     */
    public function update(int $id, array $data): BusinessUnit|null
    {
        $note = BusinessUnit::find($id);


        if (is_null($note)) {
            return null;
        }

        // If everything is OK, then update.
        $note->update($data);

        // Finally return the updated note.
        return $this->getByID($note->id);
    }
}
