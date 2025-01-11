<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    public static $i = 0;

    public function definition()
    {
        self::$i++;
        $randomDate = fake()->dateTimeBetween('-21 days', 'now');

        return [
            'body' => fake()->text(),
            'card_id' => fake()->numberBetween(1, 19),
            'user_id' => fake()->numberBetween(1, 22),
            'created_at' => $randomDate,
            'updated_at' => $randomDate,
        ];
    }
}
