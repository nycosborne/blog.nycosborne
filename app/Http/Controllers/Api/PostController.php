<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePost;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Http\Resources\TagResource;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
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
        $fileName = null;
        if($request->image){
            $fileName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('uploads'), $fileName);
        }

        $post = Post::create([
            'excerpt' => $request->excerpt,
            //todo would like to determine why my liter hates this $request->content
            // this might just be a thing, or maybe I need a plugin
            'content' => $request->content,
            'category_id' => $request->category_id,
            'title' => $request->title,
            'slug' => $request->title, //Slug attribute is dynamically build from post title
            'image' => $fileName
        ]);

        foreach (explode(",", $request->tags) as $tagCheck) {
            // Check if this is a new tag
            $tag = Tag::where('tag_name', $tagCheck)->first();

            if ($tag == null) {
                $tag = new Tag();
                $tag->tag_name = $tagCheck;;
                $tag->save();
            }
            $post->tags()->attach($tag);

        }

        return response([
            'slug' => $post->slug,
            'tag' => $post->tags()
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Post $post
     * @return PostResource
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
     * @param CreatePost $request
     * @param Post $post
     * @return Response
     */
    public function update(CreatePost $request, Post $post)
    {
        clock('updating');
        clock($request->all());
        $data = $request->validated();

        $fileName = null;
        if($request->image && gettype($request->image) != 'string'){
            $fileName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('uploads'), $fileName);
        }
        $data['image'] = $fileName;
        clock($data);
        $post->update($data);

        $post->tags()->detach();
        if(!empty($request->tags)) {
            foreach (explode(",", $request->tags) as $v) {
                clock("tag work");
                // Check if this is a new tag
                $tag = Tag::where('tag_name', $v)->first();
                if ($tag == null) {
                    $tag = new Tag();
                    $tag->tag_name = $v;;
                    $tag->save();
                }
                $post->tags()->attach($tag);
            }
        }

        return response([
            'post' => json_encode($data)
        ]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //todo will need to updated post_tag table.
    }
}
