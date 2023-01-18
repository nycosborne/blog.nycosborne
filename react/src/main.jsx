import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Styling
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {ContextProvider} from "./context/ContextProvider";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router}/>
        </ContextProvider>
    </React.StrictMode>,
)
