<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Card>
 */
class CardFactory extends Factory
{
    public static $i = 0;

    public function definition()
    {
        self::$i++;
        return [
            'title' => "Card nbr " . self::$i,
            'type' => fake()->numberBetween(0, 1),
            'status' => 2,
            'description' => fake()->text(200),
            'duration' => fake()->numberBetween(1, 99),
        ];
    }
}
