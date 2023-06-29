<?php

namespace App\Repositories\AdTech;

use Illuminate\Support\Str;
use App\Helpers\UploadHelper;
use App\Interfaces\CrudInterface;
use App\Models\AdTech\TrackerList;
use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class TrackerListRepository implements CrudInterface
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
     * Get All tags.
     *
     * @return collections Array of tag Collection
     */
    public function getAll(array $filters=[]): Paginator
    {
        $query = TrackerList::query();

        foreach ($filters as $key => $value) {
            if ($key === 'dis') {
                continue;
            }
            $query->where($key, $value);
        }
        return  $query->orderBy('id', 'desc')->paginate(10);
    }

    /**
     * Get Paginated tag Data.
     *
     * @param int $pageNo
     * @return collections Array of tag Collection
     */
    public function getPaginatedData($perPage): Paginator
    {
        $perPage = isset($perPage) ? intval($perPage) : 12;
        return TrackerList::orderBy('id', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get Searchable tag Data with Pagination.
     *
     * @param int $pageNo
     * @return collections Array of tag Collection
     */
    public function searchtag($keyword, $perPage): Paginator
    {
        $perPage = isset($perPage) ? intval($perPage) : 10;

        return TrackerList::where('name', 'like', '%' . $keyword . '%')
            ->orWhere('description', 'like', '%' . $keyword . '%')
            ->orWhere('rate', 'like', '%' . $keyword . '%')
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    /**
     * Create New tag.
     *
     * @param array $data
     * @return object tag Object
     */
    public function create(array $data): Tag
    {
        return TrackerList::create($data);
    }

    /**
     * Delete tag.
     *
     * @param int $id
     * @return boolean true if deleted otherwise false
     */
    public function delete(int $id): bool
    {
        $tag = TrackerList::find($id);
        if (empty($tag)) {
            return false;
        }

        $tag->delete($tag);
        return true;
    }

    /**
     * Get tag Detail By ID.
     *
     * @param int $id
     * @return void
     */
    public function getByID(int $id): Tag|null
    {
        return Tag::find($id);
    }

    /**
     * Update tag By ID.
     *
     * @param int $id
     * @param array $data
     * @return object Updated tag Object
     */
    public function update(int $id, array $data): TrackerList|null
    {
        $tag = TrackerList::find($id);


        if (is_null($tag)) {
            return null;
        }

        // If everything is OK, then update.
        $tag->update($data);

        // Finally return the updated tag.
        return $this->getByID($tag->id);
    }
}
