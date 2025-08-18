

import { createContext, useState } from "react";

/// 1. Create Context
export const ThemeContext = createContext()

/// 2. Provide the context - Part A 
// Part B is wrap context provider to the parent component --> App.jsx

export const ThemeProvider = ({children})=>{
   /// write all the logic, maintain the central state here
   const [theme, setTheme] = useState("light");

   function toggleTheme(){
    setTheme((prevTheme)=> prevTheme=="light"? "dark": "light" )
   }

    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}