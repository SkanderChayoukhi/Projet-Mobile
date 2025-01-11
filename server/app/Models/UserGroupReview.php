<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserGroupReview extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'partner_id', 'group_id', 'review'];
}
