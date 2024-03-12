<?php

namespace App\Services;

use App\Models\Post;
define("LINK_TO_POST", "https://nycosborne.com/post/");

/**
 * Class PostService
 * @package App\Services
 */
class PostService
{
    /**
     * @param Post $post
     * @return bool|string
     */
    public function repostToReddit(Post $post): bool|string
    {
        try {
            // Build data array for repost
            $postDate = [
                "title" => $post->title,
                "body" => $post->content,
                "link" => LINK_TO_POST . $post->slug
            ];

            $url = 'https://wguky0xl8b.execute-api.us-east-1.amazonaws.com/demo_lam';
            $ch = curl_init($url);
            $jsonData = json_encode($postDate);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($ch);
            curl_close($ch);
            return $result;
        } catch (\Exception $e) {
            // Log the error message
            error_log($e->getMessage());
            // Return false or a custom error message
            return false;
        }
    }
}

