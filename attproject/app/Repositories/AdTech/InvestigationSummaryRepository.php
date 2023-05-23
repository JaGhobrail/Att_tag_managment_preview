<?php

namespace App\Repositories\AdTech;

use Illuminate\Support\Str;
use App\Helpers\UploadHelper;
use App\Interfaces\CrudInterface;
use App\Models\AdTech\InvestigationSummary;
use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class InvestigationSummaryRepository implements CrudInterface
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
    public function getAll(): Paginator
    {
        return InvestigationSummary::
            orderBy('id', 'desc')
            ->paginate(10);
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
        return InvestigationSummary::orderBy('id', 'desc')
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

        return InvestigationSummary::where('name', 'like', '%' . $keyword . '%')
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
        return InvestigationSummary::create($data);
    }

    /**
     * Delete tag.
     *
     * @param int $id
     * @return boolean true if deleted otherwise false
     */
    public function delete(int $id): bool
    {
        $tag = InvestigationSummary::find($id);
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
    public function update(int $id, array $data): InvestigationSummary|null
    {
        $tag = InvestigationSummary::find($id);


        if (is_null($tag)) {
            return null;
        }

        // If everything is OK, then update.
        $tag->update($data);

        // Finally return the updated tag.
        return $this->getByID($tag->id);
    }
}
