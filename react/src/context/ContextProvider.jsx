import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    user: null,
    setUser: () => {
    },
    token: null,
    setToken: () => {
    },
    // postId: null,
    // setPostId: () => {},
});

export const ContextProvider = ({children}) => {

    const [user, _setUser] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    // const [postId, setPostId ] = useState({});

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setUser = (user) => {
        _setUser(user)
        if (user.is_admin === 0) {
            setIsAdmin(false);
        } else {
            setIsAdmin(true);
        }
    }


    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            // postId,
            // setPostId
            isAdmin
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
