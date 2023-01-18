import {Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";


function DefaultLayout() {

    const {user, token} = useStateContext();

    return (
        <div>
            This is the default layout
            <Outlet/>
        </div>
    );
}

export default DefaultLayout;
