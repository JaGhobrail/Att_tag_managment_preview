<?php

namespace App\Models\AdTech;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
