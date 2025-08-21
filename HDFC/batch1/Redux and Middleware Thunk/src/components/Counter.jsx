import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Counter = () => {
    // how to access the state from the store??
    /// React-Redux gives a fn called useSelector 
    /// useSelector provides access to the store or subscribes to the store

    const count = useSelector((state)=> state.counter.count);
    const dispatch = useDispatch()
//    console.log(count)
  return (
    <div>
        <h3>{count}</h3>
        <button onClick={()=> dispatch({type:"increment"})}>Increase Count</button>
        <button onClick={()=> dispatch({type:"decrement"})}>Decrease Count</button>
    </div>
  )
}

export default Counter

///// main.jsx
// wrap the provider to the App
// import { Provider } from 'react-redux'
// import store from './redux/store.js'

// createRoot(document.getElementById('root')).render(
// <Provider store={store}>
//     <App />
// </Provider>