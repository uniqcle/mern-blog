import { configureStore } from '@reduxjs/toolkit'; 
import { postReducer } from "./slices/posts";
import { authReducer } from './slices/auth';

export const store = configureStore({
    reducer: {
        blog: postReducer,
        auth: authReducer,
    },
}); 

export default store; 

