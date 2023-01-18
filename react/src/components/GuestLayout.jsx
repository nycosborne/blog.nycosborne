import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

function GuestLayout() {

    const {token} = useStateContext();

    if (token){
        return <Navigate to='/'/>
    }


    return (
        <div>
            Guest User Layout!!
            <Outlet/>
        </div>
    );
}

export default GuestLayout;
