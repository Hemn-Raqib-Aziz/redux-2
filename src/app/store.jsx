import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/CounterSlice';
import PostReducer from '../features/Post/PostSlice';
import authSlice from '../features/auth/AuthSlice.jsx';
import userSlice from '../features/user/UsersSlice.jsx'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        posts: PostReducer,
        auth: authSlice,
        users: userSlice,
    } 
});


export default store;