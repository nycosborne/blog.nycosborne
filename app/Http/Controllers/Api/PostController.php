<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePost;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Response;
use App\Services\PostService;

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
     * Store a newly created resource in storage.
     *
     * @param CreatePost $request
     * @return Response
     */
    public function store(CreatePost $request, PostService $postService)
    {

        $data = $request->validated();
        $fileName = null;
        if ($request->image) {
            $fileName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('uploads'), $fileName);
        }

        $post = Post::create([
            'excerpt' => $request->excerpt,
            //todo would like to determine why my liter hates this $request->content
            // this might just be a thing, or maybe I need a plugin
            'content' => $request->content,
            'title' => $request->title,
            'slug' => $request->title, //Slug attribute is dynamically build from post title
            'image' => $fileName
        ]);

        //Repost to Reddit after creating a new post
        $postService->repostToReddit($post);

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
     * Update the specified resource in storage.
     *
     * @param CreatePost $request
     * @param Post $post
     * @return Response
     */
    public function update(CreatePost $request, Post $post)
    {

        $data = $request->validated();

        $fileName = null;
        if ($request->image && gettype($request->image) != 'string') {
            $fileName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('uploads'), $fileName);
            $data['image'] = $fileName;
            //If upload new image and we have existing image
            if ($post->image &&
                file_exists(public_path('uploads') . "/" . $fileName)) {
                // Delete old imag
                unlink("uploads/" . $post->image);
            }
        }
        //Update post with form values.
        $post->update($data);
        //Delete all
        $post->tags()->detach();
        if (!empty($request->tags)) {
            foreach (explode(",", $request->tags) as $v) {

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
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

}
