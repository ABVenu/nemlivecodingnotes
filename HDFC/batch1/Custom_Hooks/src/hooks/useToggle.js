import { useState } from "react";



function useToggle (){
    const [value, setValue]= useState(true);

    const toggle = ()=> setValue((prevValue)=> !prevValue)

    return [value, toggle]
}


export default useToggle;
/// UseToogle Hook is ready to use