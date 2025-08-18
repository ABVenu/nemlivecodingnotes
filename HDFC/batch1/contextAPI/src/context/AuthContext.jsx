import { createContext, useState } from "react";


export const AuthContext = createContext();


export const AuthProvider = ({children})=>{

    const [isloggedIn, setIsLoggedIn] = useState(false);


    function login(){
        setIsLoggedIn(true)
    }
    return (
        <AuthContext.Provider value={{isloggedIn,login}}>
            {children}
        </AuthContext.Provider>
    )
}