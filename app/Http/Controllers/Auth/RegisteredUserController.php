<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'firstname' => [ 'string', 'max:255'],
            'lastname' => [ 'string', 'max:255'],
            'title' => [ 'string', 'max:10'],
            'address' => [ 'string', 'max:255'],
            'city' => [ 'string', 'max:255'],
            'state' => [ 'string', 'max:255'],
            'postcode' => [ 'string', 'max:255'],
            'phone' => [ 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user)); // Send email verification notification

        Auth::login($user);

        return response()->noContent();
    }
}
