import {Outlet} from "react-router-dom";

function GuestLayout() {
    return (
        <div>
            Guest User Layout!!
            <Outlet/>
        </div>
    );
}

export default GuestLayout;
