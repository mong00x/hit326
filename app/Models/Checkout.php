<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    use HasFactory;
    protected $fillable=[
        'customer_email',
        'product_id',
        'quantity',
        'total',
        'status',
    ];
}
