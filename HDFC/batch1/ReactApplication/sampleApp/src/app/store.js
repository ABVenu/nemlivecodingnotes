import {configureStore} from "@reduxjs/toolkit"
import usersReducer  from "../features/users/users.slice.js"

const store = configureStore({
    reducer:{
        users:usersReducer
    }
})


export default store