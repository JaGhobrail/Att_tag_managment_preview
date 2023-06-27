<?php

namespace App\Repositories\AdTech;

use Illuminate\Support\Str;
use App\Helpers\UploadHelper;
use App\Interfaces\CrudInterface;
use App\Models\AdTech\Note;
use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class NoteRepository implements CrudInterface
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
     * Get All Note.
     *
     * @return collections Array of Note Collection
     */
    public function getAll(): Paginator
    {
        return Note::
            orderBy('id', 'desc')
            ->paginate(10);
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
        return Note::orderBy('id', 'desc')
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

        return Note::where('name', 'like', '%' . $keyword . '%')
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
    public function create(array $data): Note
    {
        return Note::create($data);
    }

    /**
     * Delete note.
     *
     * @param int $id
     * @return boolean true if deleted otherwise false
     */
    public function delete(int $id): bool
    {
        $note = Note::find($id);
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
    public function getByID(int $id): Note|null
    {
        return Note::find($id);
    }

    /**
     * Update note By ID.
     *
     * @param int $id
     * @param array $data
     * @return object Updated note Object
     */
    public function update(int $id, array $data): Note|null
    {
        $note = Note::find($id);


        if (is_null($note)) {
            return null;
        }

        // If everything is OK, then update.
        $note->update($data);

        // Finally return the updated note.
        return $this->getByID($note->id);
    }
}
