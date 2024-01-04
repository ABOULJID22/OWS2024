<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('home'); // Assurez-vous d'avoir une vue nommée "home.blade.php"
    }

    // Ajoutez d'autres méthodes en fonction de vos besoins
}
