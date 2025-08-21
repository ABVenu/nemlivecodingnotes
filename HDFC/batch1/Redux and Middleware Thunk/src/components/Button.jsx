


/// This compoenent is meant just to demonstrate the behaviour of the middleware



import React, { useState } from 'react'


function useCheckClicks(callback, delay = 5000) {
    const [lastClick, setLastClick] = useState(0);

    return () => {
        let now = Date.now();
        if (now - lastClick < delay) {
            console.log("Your Click is blocked");
            return
        }
        setLastClick(now)
        callback()
    }
}
const Button = () => {

   /// main logic is click
   /// but click should not happen within 5 seconds, 
   /// so checking of 5 seconds done by useCheckClicks
   // hence useCheckClicks is working similar to middleware
    const handleClick = useCheckClicks( () => {
        console.log("click")
    })

    return (
        <div>

            <button onClick={handleClick}>Click Me</button>

        </div>
    )
}

export default Button