<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tag extends Model
{

    protected $fillable = ['tag_name'];

    use HasFactory;


    public function posts()
    {
        return $this->belongsToMany(Post::class);
    }
}
