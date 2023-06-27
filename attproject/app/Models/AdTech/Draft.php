<?php

namespace App\Models\AdTech;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Draft extends Model
{
    use HasFactory;
    // protected $fillable = ['body','user_id'];
    protected $gaurd = [];

    public function draftable()
    {
        return $this->morphTo();
    }
}
