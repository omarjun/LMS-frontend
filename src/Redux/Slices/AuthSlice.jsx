import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/AxiosInstance"

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn')  || false,
    role: localStorage.getItem('role') || '',
    data: localStorage.getItem('data') ||{}
};

export const createAccount = createAsyncThunk("/auth/signup", async(data) => {
    try {
        const res = axiosInstance.post("users/register",data);
        toast.promise(res, {
            loading: "wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create acount"
        });

        return (await res).data
    } catch (error) {
       toast.error(error?.response?.data?.message); 
    }
})

export const login = createAsyncThunk("/auth/login", async(data) => {
    try {
        const res = axiosInstance.post("users/login",data);
        toast.promise(res, {
            loading: "wait! Logging you in...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to Login"
        });

        return (await res).data
    } catch (error) {
       toast.error(error?.response?.data?.message); 
    }
})

export const logout = createAsyncThunk("/auth/logout", async() => {
    try {
        const res = axiosInstance.post("users/logout");
        toast.promise(res, {
            loading: "wait! Logout in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to Logout"
        });

        return (await res).data
    } catch (error) {
       toast.error(error?.response?.data?.message); 
    }
})
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.
        addCase(login.fulfilled, (state, action) =>{
            localStorage.setItem("data", JSON.stringify(action?.payload?.data?.user));
            localStorage.setItem("isloggedIn", true);
            localStorage.setItem("role", action?.payload?.data?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.data?.user
            state.role = action?.payload?.data?.user
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
    }
});

export const {} = authSlice.actions;

export default authSlice.reducer;