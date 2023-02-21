<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CategoryResource;

class PostResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $postTags = [];

        // Todo move this to the post model
        foreach ($this->tags->all() as $tag){

            $postTags[] = ['tag_name' => $tag->tag_name];
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'created' => $this->created_at->format('M d Y'),
            'slug' => $this->slug,
            'category_name' => $this->category->name ?? null,
            'image' => $this->image,
            'tags' => $postTags
        ];

    }
}
