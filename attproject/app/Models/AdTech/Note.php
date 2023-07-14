<?php

namespace App\Models\AdTech;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Note extends Model
{
    use HasFactory;
    protected $table = "notes";
    // protected $fillable = ['body','user_id'];
    protected $guarded = [];

    public function noteable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
