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

export const createNewCourse = createAsyncThunk(
    "/course/create",
    async (data) => {
      try {
        const formdata = new FormData();
        formdata.append("title", data?.title);
        formdata.append("category", data?.category);
        formdata.append("description", data?.description);
        formdata.append("thumbnail", data?.thumbnail);
  
        const response = axiosInstance.post("/courses/createCourse", formdata);
        
        // Display toast notification while creating the course
        toast.promise(response, {
          loading: "Creating new course...",
          success: "Course created successfully!",
          error: "Failed to create course."
        });
  
        return (await response).data;
      } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred.");
        return rejectWithValue(error?.response?.data);
      }
    }
  );

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