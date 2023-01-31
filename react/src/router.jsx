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
                path: '/',
                element: <Navigate to="/posts"/>
            },
            {
                path: '/posts',
                element: <Posts/>
            },
            {
                path: '/post/:id',
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
                path: '/',
                element: <Navigate to="/users"/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/posts/new',
                element: <PostForm/>
            }
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
