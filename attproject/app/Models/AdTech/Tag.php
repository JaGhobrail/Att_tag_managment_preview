<?php

namespace App\Models\AdTech;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'rate', 'rank', 'accessibility'];

    public function customers()
    {
        return $this->belongsToMany(Customer::class);
    }

    public function providers()
    {
        return $this->hasMany(Provider::class);
    }
}
