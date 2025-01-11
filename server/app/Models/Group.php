<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'creator_id', 'description', 'tasks_frequency', 'is_paused'];

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'group_tags', 'group_id', 'tag_id');
    }

    public function types()
    {
        return $this->belongsToMany(Type::class, 'group_types', 'group_id', 'type_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_groups', 'group_id', 'user_id');
    }

    public function invitations()
    {
        return $this->hasMany(Invitation::class);
    }
}
