<?php

namespace App\Http\Controllers\AdTech\Welcome;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Support\Renderable;

class WelcomeController extends Controller
{
    public function welcome(): Renderable
    {
        return view('welcome');
    }
}
