<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'email' => 'Admin@gmail.com',
            'password' => Hash::make('password'), // default password
        ]);

        DB::table('products')->insert([
            'name' => 'Product 1',
            'description' => 'Product 1 description',
            'price' => '100',
            'image' => 'https://picsum.photos/id/100/500',
            'is_active' => '1',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('products')->insert([
            'name' => 'Product 2',
            'description' => 'Product 2 description',
            'price' => '200',
            'image' => 'https://picsum.photos/id/200/500',
            'is_active' => '1',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('products')->insert([
            'name' => 'Product 3',
            'description' => 'Product 3 description',
            'price' => '300',
            'image' => 'https://picsum.photos/id/300/500',
            'is_active' => '1',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('products')->insert([
            'name' => 'Product 4',
            'description' => 'Product 4 description',
            'price' => '400',
            'image' => 'https://picsum.photos/id/400/500',
            'is_active' => '1',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

    }
}
