import {configureStore} from '@reduxjs/toolkit'
import AuthSliceReducer from './Slices/AuthSlice';
import CourseSliceReducer from './Slices/CourseSlice';
import RozarpaySliceReducer from "./Slices/RazorpaySlice"

const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        course: CourseSliceReducer,
        rozarpay: RozarpaySliceReducer
    },
    devTools: true
});


export default store;