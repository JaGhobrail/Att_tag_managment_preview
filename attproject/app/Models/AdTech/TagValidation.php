<?php

namespace App\Models\AdTech;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagValidation extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'rules'];

    // no relationships defined for this model
}
