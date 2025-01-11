<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDefi extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'group_card_id', 'has_finished'];
}
