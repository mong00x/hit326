<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([ // Validate request
            'email' => 'required|email|unique:users,email', // Email must be unique in the users table
            'password' => 'required|string|confirmed' 
        ]);
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        $token = $user->createToken('MyAppToken')->plainTextToken; // Create token
        return response()->json([
            'user'=>$user,
            'token' => $token
        ], 201); // 201 status code for created
    }

    public function logout()
    {
        auth()->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });
        return [
            'message'=>'Logged out'
        ];
    }
    
    public function login(Request $request)
    {
        $request->validate([ // Validate request
            'email' => 'required|email|', // Email must be unique in the users table
            'password' => 'required|string|' 
        ]);
        $user = User::where('email', $request->email)->first(); // Get user by email

        if (!$user || !Hash::check($request->password, $user->password)) { // Check if user exists and password is correct
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401); // 401 status code for unauthorized
        }
        $token = $user->createToken('MyAppToken')->plainTextToken; // Create token
        return response()->json([
            'user'=>$user,
            'token' => $token
        ], 201); // 201 status code for created
    }

}
