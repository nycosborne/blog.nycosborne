<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePost;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use mysql_xdevapi\Collection;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {

        return PostResource::collection(Post::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreatePost $request
     * @return Response
     */
    public function store(CreatePost $request)
    {

        $data = $request->validated();
//        $fileName = null;
//        if($request->image){
//            $fileName = time() . '.' . $request->image->extension();
//            $request->image->move(public_path('uploads'), $fileName);
//        }

        Post::create([
            'excerpt' => $request->excerpt,
            //todo would like to determine why my liter hates this $request->content
            // this might just be a thing, or maybe I need a plugin
            'content' => $request->content,
            'category_id' => $request->category_id,
            'title' => $request->title,
            // todo Might could build the slug dynamically from the blog title.
            'slug' => $request->slug
//            'image' => $fileName
        ]);

        return response([
            'post' => json_encode($data)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param PostRequest $request
     * @param Post $post
     * @return Response
     */
    public function update(PostRequest $request, Post $post)
    {

        $data = $request->validated();
        $post->update($data);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
    }
}
