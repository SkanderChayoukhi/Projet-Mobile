<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'type',
        'description',
        'duration',
        'status',
        'image',
    ];

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'card_tags', 'card_id', 'tag_id');
    }
}
