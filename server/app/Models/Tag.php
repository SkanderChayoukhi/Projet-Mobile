<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function groups()
    {
        return $this->belongsToMany(Group::class, 'group_tags', 'tag_id', 'group_id');
    }

    public function cards()
    {
        return $this->belongsToMany(Card::class, 'card_tags', 'tag_id', 'card_id');
    }
}
