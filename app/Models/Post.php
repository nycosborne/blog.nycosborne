<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{

    protected $with = ['category'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'excerpt',
        'content',
        'excerpt',
        'category_id',
        'slug',
        'image'
    ];

    use HasFactory;


    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    // Setting and getting for model properties.
    public function setSlugAttribute($title)
    {

        $this->attributes['slug'] = str_replace(" ", "-", strtolower($title));
    }

}
