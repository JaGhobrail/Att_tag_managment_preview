<?php

namespace App\Models\AdTech;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserUnit extends Model
{
    use HasFactory;
    protected $table = "user_units";
    protected $guarded = [];
}
