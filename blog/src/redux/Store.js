import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './UserSlice'
export default configureStore({
    reducer:{
        users:UserReducer
    }
    })