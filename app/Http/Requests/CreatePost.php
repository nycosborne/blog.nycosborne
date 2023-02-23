<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
        clock($this->tags);

        return [
            'title' => 'string|required|unique:posts', //todo post title should be unique to this user not all
            'content' => 'string',
            'excerpt' => 'string',
            'category_id' => 'integer',
            'tags' => '',
//            'image' => 'image'
        ];
    }
}
