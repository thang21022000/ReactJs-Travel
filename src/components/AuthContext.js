import {createContext, useState} from 'react';
 
const AuthContext = createContext();

function AuthProvider({children}) {
    const GetUserFromLocalStorage = () =>{
        return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): {user: null}; 
    }

    const [isLogged, setIsLogged] = useState(() => {return !!JSON.parse(localStorage.getItem("user"))});

    const [user, setUser] = useState(GetUserFromLocalStorage());

    return(
        <AuthContext.Provider value={{isLogged, setIsLogged, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}