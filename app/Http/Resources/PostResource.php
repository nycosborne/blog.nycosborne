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
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
//        logger(json_encode($this->category_id->name));
//clock($this->category->name);
        return [
            'id' => $this->id,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'created' => $this->created_at->format('Y-m-d H:i:s'),
            'slug' => $this->slug,
            'category_name' => $this->category->name
        ];
//        return parent::toArray($this);
    }
}
