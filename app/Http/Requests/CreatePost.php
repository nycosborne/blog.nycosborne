<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePost extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {

        clock($this->title);
        return [
            'title' => 'string',
            'content' => 'string',
            'excerpt' => 'string',
            'slug' => 'string',
            'category_id' => 'integer',
            'image' => 'image'
        ];
    }
}
