<?php

namespace App\Models\AdTech;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Unit extends Model
{
    use HasFactory;
    protected $table = "units";
    protected $guarded = [];


    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
