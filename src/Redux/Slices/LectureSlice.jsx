import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/AxiosInstance"

const initialState = {
    lectures:[]
}

export const getAllLectures = createAsyncThunk("courses/lectures", async(courseId) => {
    try {
        
        const response = axiosInstance.get(`/courses/${courseId}`);
        toast.promise(response,{
            loading: "Please wait, Lectures are loading",
            success: "Lectures fetched Successfully",
            error: "Failed to load the lectures"
        });

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const addCourseLecture = createAsyncThunk("courses/lectures/add", async(data) => {

    const formdata = new FormData();

    formdata.append("lecture", data.lecture);
    formdata.append("title", data.title);
    try {
        const response = axiosInstance.post(`/courses/${data.id}`, formdata);
        toast.promise(response,{
            loading: "Please wait, adding course lecture",
            success: "Lecture added Successfully",
            error: "Failed to add the lecture"
        });

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const deleteLectureFromCourse = createAsyncThunk("courses/lectures", async(data) => {
    try {
        const response = axiosInstance.delete(`/courses/${data.courseId}/${data.lectureId}`);
        toast.promise(response,{
            loading: "Please wait, deleting course lecture",
            success: "Lectures deleted Successfully",
            error: "Failed to delete the lectures"
        });

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});


const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllLectures.fulfilled, (state, action) =>{
            state.lectures = action?.payload?.data;
        })
        builder.addCase(addCourseLecture.fulfilled, (state, action) =>{
            state.lectures = action?.payload?.course?.data;
        })
    }
})

export default lectureSlice.reducer