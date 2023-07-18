<?php

namespace App\Repositories\AdTech;

use App\Interfaces\CrudInterface;
use App\Models\AdTech\PageSectList;
use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class PageSectListRepository implements CrudInterface
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
     * Get All items.
     *
     * @return collections Array of item Collection
     */
    public function getAll(array $filters = []): Paginator
    {
        $query = PageSectList::query();

        foreach ($filters as $key => $value) {
            if ($key === 'dis') {
                continue;
            }
            $query->where($key, $value);
        }
        return  $query->with(['drafts', 'note_list', 'drafts.user', 'note_list.user', 'note_list.user.roles', 'drafts.user.roles'])->orderBy('id', 'desc')->paginate(10);
    }

    /**
     * Get Paginated item Data.
     *
     * @param int $pageNo
     * @return collections Array of item Collection
     */
    public function getPaginatedData($perPage): Paginator
    {
        $perPage = isset($perPage) ? intval($perPage) : 12;
        return PageSectList::orderBy('id', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get Searchable item Data with Pagination.
     *
     * @param int $pageNo
     * @return collections Array of item Collection
     */
    public function searchitem($keyword, $perPage): Paginator
    {
        $perPage = isset($perPage) ? intval($perPage) : 10;

        return PageSectList::where('name', 'like', '%' . $keyword . '%')
            ->orWhere('description', 'like', '%' . $keyword . '%')
            ->orWhere('rate', 'like', '%' . $keyword . '%')
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    /**
     * Create New item.
     *
     * @param array $data
     * @return object item Object
     */
    public function create(array $data): PageSectList
    {
        return PageSectList::create($data);
    }

    /**
     * Delete item.
     *
     * @param int $id
     * @return boolean true if deleted otherwise false
     */
    public function delete(int $id): bool
    {
        $item = PageSectList::find($id);
        if (empty($item)) {
            return false;
        }

        $item->delete($item);
        return true;
    }

    /**
     * Get item Detail By ID.
     *
     * @param int $id
     * @return void
     */
    public function getByID(int $id)
    // : Draft|null
    {
        $item = PageSectList::find($id);
        if (is_null($item)) {
            return null;
        }
        return PageSectList::find($id)->note_list;
    }

    /**
     * Update item By ID.
     *
     * @param int $id
     * @param array $data
     * @return object Updated item Object
     */
    public function update(int $id, array $data): PageSectList|null
    {
        $item = PageSectList::find($id);


        if (is_null($item)) {
            return null;
        }

        // If everything is OK, then update.
        $item->update($data);

        // Finally return the updated item.
        return $this->getByID($item->id);
    }

    public function saveAllDrafts()
    {
        $items = PageSectList::has('drafts')->get();
        foreach ($items as $item) {
            $latestDraft = $item->drafts()->latest('created_at')->first();
            if ($latestDraft) {
                $body =  json_decode($latestDraft->body, true);
                $item->result = $body['result'];
                $item->save();
                $item->drafts()->delete();
            }
        }
        return $items;
    }

    public function clearAllDrafts()
    {
        $items = PageSectList::with('drafts')->get();
        foreach ($items as $item) {
            $item->drafts()->delete();
        }
        return $items;
    }
}
