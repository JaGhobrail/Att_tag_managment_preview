<?php

namespace App\Repositories\AdTech;

use Illuminate\Support\Str;
use App\Helpers\UploadHelper;
use App\Interfaces\CrudInterface;
use App\Models\AdTech\VendorList;
use App\Models\AdTech\Note;
use App\Models\AdTech\Draft;
use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class VendorListRepository implements CrudInterface
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
    public function getAll(array $filters = []): Paginator
    {
        $query = VendorList::query();

        foreach ($filters as $key => $value) {
            if ($key === 'dis') {
                continue;
            }
            $query->where($key, $value);
        }
        return  $query->with(['drafts', 'note_list', 'drafts.user', 'note_list.user', 'note_list.user.roles', 'drafts.user.roles'])->orderBy('id', 'desc')->paginate(10);
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
        return VendorList::orderBy('id', 'desc')
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

        return VendorList::where('name', 'like', '%' . $keyword . '%')
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
    public function create(array $data): VendorList
    {
        return VendorList::create($data);
    }

    /**
     * Delete tag.
     *
     * @param int $id
     * @return boolean true if deleted otherwise false
     */
    public function delete(int $id): bool
    {
        $tag = VendorList::find($id);
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
    public function getByID(int $id)
    // : Draft|null
    {
        $tag = VendorList::find($id);
        if (is_null($tag)) {
            return null;
        }
        return VendorList::find($id)->note_list;
    }

    /**
     * Update tag By ID.
     *
     * @param int $id
     * @param array $data
     * @return object Updated tag Object
     */
    public function update(int $id, array $data): VendorList|null
    {
        $tag = VendorList::find($id);


        if (is_null($tag)) {
            return null;
        }

        // If everything is OK, then update.
        $tag->update($data);

        // Finally return the updated tag.
        return $this->getByID($tag->id);
    }

    public function getVendorsName()
    {
        return VendorList::pluck('vendor_name')->all();
    }

    public function saveAllDrafts()
    {
        // $vendors = VendorList::whereHas('drafts')->with('drafts');
        // $userId = Auth::id(); // Assuming you're using Laravel's authentication system

        // $vendorsWithYourDrafts = $vendorsWithDrafts->whereHas('drafts', function ($query) use ($userId) {
        //     $query->where('user_id', $userId);
        // })->get();

        $vendors = VendorList::has('drafts')->get();
        foreach ($vendors as $vendor) {
            $latestDraft = $vendor->drafts()->latest('created_at')->first();
            if ($latestDraft) {
                $body =  json_decode($latestDraft->body, true);
                $vendor->result = $body['result'];
                $vendor->save();
                $vendor->drafts()->delete();
            }
        }
        return $vendors;
    }

    public function clearAllDrafts()
    {
        // $vendors = VendorList::whereHas('drafts')->with('drafts');
        // $userId = Auth::id(); // Assuming you're using Laravel's authentication system

        // $vendorsWithYourDrafts = $vendorsWithDrafts->whereHas('drafts', function ($query) use ($userId) {
        //     $query->where('user_id', $userId);
        // })->get();

        $vendors = VendorList::with('drafts')->get();
        foreach ($vendors as $vendor) {
            $vendor->drafts()->delete();
        }
        return $vendors;
    }
}
