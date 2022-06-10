<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $fillable=[
        'firstname',
        'lastname',
        'title',
        'address',
        'city',
        'state',
        'postcode',
        'country',
        'phone',
        'email',
    ];
}
