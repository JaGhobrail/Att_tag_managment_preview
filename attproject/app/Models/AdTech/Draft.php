<?php

namespace App\Models\AdTech;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Draft extends Model
{
    use HasFactory;
    protected $table = "drafts";
    // protected $fillable = ['body','user_id'];
    protected $guarded = [];

    public function draftable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
