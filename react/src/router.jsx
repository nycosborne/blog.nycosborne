import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./view/Login.jsx";
import Signup from "./view/Signup.jsx";
import Users from "./view/Users.jsx";
import NotFount from "./view/NotFount.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import MasterLayout from "./components/MasterLayout.jsx";
import Dashboard from "./view/Dashboard.jsx";
import Posts from "./view/Posts.jsx";
import Post from "./view/Post.jsx";
import PostForm from "./view/PostForm.jsx";
import Categories from "./view/Categories.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MasterLayout/>,
        children: [
            {
                path: '/categories/:cat_slug',
                element: <Posts/>
            },
            {
                path: '/',
                element: <Posts/>
            },
            {
                path: '/posts',
                element: <Posts/>
            },
            {
                path: '/post/:post_slug',
                element: <Post/>
            },
            {
                path: '/categories/',
                element: <Categories/>
            }
        ]

    },
    {
        path: '/',
        element: <AdminLayout/>,
        children: [
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/post/new',
                element: <PostForm key={'createNew'}/>
            },
            {
                path: '/post/edit/:post_slug',
                element: <PostForm key={'createUpdate'}/>
            },
        ]

    },
    {
        path: '/',
        element: <GuestLayout/>,
        children:[
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            }
        ]

    },
    {
        path: '*',
        element: <NotFount/>
    }

])

export default router;
