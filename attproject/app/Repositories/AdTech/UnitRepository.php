<?php

namespace App\Repositories\AdTech;

use Illuminate\Support\Str;
use App\Helpers\UploadHelper;
use App\Interfaces\CrudInterface;
use App\Models\AdTech\Unit;
use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class UnitRepository implements CrudInterface
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
     * Get All Unit.
     *
     * @return collections Array of Unit Collection
     */
    public function getAll(array $filters=[]): Paginator
    {
        $query = Unit::query();

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
        return Unit::orderBy('id', 'desc')
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

        return Unit::where('name', 'like', '%' . $keyword . '%')
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
    public function create(array $data): Unit
    {
        return Unit::create($data);
    }

    /**
     * Delete note.
     *
     * @param int $id
     * @return boolean true if deleted otherwise false
     */
    public function delete(int $id): bool
    {
        $note = Unit::find($id);
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
    public function getByID(int $id): Unit|null
    {
        return Unit::find($id);
    }

    /**
     * Update note By ID.
     *
     * @param int $id
     * @param array $data
     * @return object Updated note Object
     */
    public function update(int $id, array $data): Unit|null
    {
        $note = Unit::find($id);


        if (is_null($note)) {
            return null;
        }

        // If everything is OK, then update.
        $note->update($data);

        // Finally return the updated note.
        return $this->getByID($note->id);
    }
}
