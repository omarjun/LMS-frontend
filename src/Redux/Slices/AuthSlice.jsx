import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/AxiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
    role: localStorage.getItem('role') || '',
    data: JSON.parse(localStorage.getItem('data')) || {}
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("users/register", data);
        toast.promise(res, {
            loading: "wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });

        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("users/login", data);
        toast.promise(res, {
            loading: "wait! Logging you in...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to Login"
        });

        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.post("users/logout");
        toast.promise(res, {
            loading: "wait! Logout in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to Logout"
        });

        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
    try {
        const res = axiosInstance.put(`users/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! Profile is Updating....",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const userData = createAsyncThunk("/users/details", async () => {
    try {
        const res = await axiosInstance.get("users/me");
        return (await res).data;
    } catch (error) {
        toast.error(error?.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                const user = action?.payload?.data?.user;
                localStorage.setItem("data", JSON.stringify(user));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", user?.role);
                state.isLoggedIn = true;
                state.data = user;
                state.role = user?.role;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.isLoggedIn = false;
                state.role = "";
            })
            .addCase(userData.fulfilled, (state, action) => {
                const user = action?.payload?.data;
                localStorage.setItem("data", JSON.stringify(user));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", user?.role);
                state.isLoggedIn = true;
                state.data = user;
                state.role = user?.role;
            });
    }
});

export default authSlice.reducer;
