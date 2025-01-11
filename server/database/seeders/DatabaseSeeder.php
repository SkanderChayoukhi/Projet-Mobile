<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Card;
use App\Models\Comment;
use App\Models\Group;
use App\Models\Tag;
use App\Models\Type;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'AgaFUN',
            'email' => 'agafun2023@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('12345'),
            'is_admin' => '1',
        ]);

        User::factory()->create([
            'first_name' => 'Ahmed',
            'last_name' => 'Mestiri',
            'email' => 'ahmed.mestiri@supcom.tn',
            'email_verified_at' => now(),
            'password' => bcrypt('12345'),
            'is_admin' => '0',
        ]);

        User::factory(20)->create();

        Tag::factory()->create([
            'name' => 'Sport',
        ]);

        Tag::factory()->create([
            'name' => 'Famille',
        ]);

        Tag::factory()->create([
            'name' => 'Outdoor',
        ]);

        Tag::factory()->create([
            'name' => 'Relax',
        ]);

        Type::factory()->create([
            'name' => 'Action',
        ]);

        Type::factory()->create([
            'name' => 'Défi',
        ]);

        Type::factory()->create([
            'name' => 'Vérité',
        ]);
    }
}
