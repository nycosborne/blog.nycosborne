<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

//    protected $with = ['post'];


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'content'
    ];

    public function post(): HasMany
    {
        return $this->hasMany(Post::class);
//        return $this->hasMany(Post::class, 'category_id');
    }

}
