import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helper/AxiosInstance"

const initialState = {
    courseData: [],
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const response = axiosInstance.get("/courses/");
        toast.promise(response, {
            loading: "Loading Courses! Please wait...",
            success: "Courses loaded successfully",
            error: "Failed to get the courses"
        });
        return ((await response).data.data)
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;  
    }
});


const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getAllCourses.fulfilled, (state, action)=> {
            
            if(action.payload){              
                state.courseData = [...action.payload];
            }
        } )
    }
})

export default courseSlice.reducer;