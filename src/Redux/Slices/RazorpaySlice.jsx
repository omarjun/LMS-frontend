import toast from "react-hot-toast";
import axiosInstance from "../../Helper/AxiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    key: "",
    subscriptionId: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
};

// Thunk to get Razorpay Key
export const getRazorPayId = createAsyncThunk("/getId", async () => {
    try {
        const response = await axiosInstance.get("/payments/rozarpay-key");
        return response.data;
    } catch (error) {
        toast.error("Failed to load Razorpay key");
        throw error;
    }
});

// Thunk to purchase a course bundle
export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async () => {
    try {
        const response = await axiosInstance.post("/payments/subscribe");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to purchase course bundle");
        throw error;
    }
});

// Thunk to verify the payment
export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data) => {
    try {        
        
        const response = await axiosInstance.post("/payments/verify", {
            paymentId: data.paymentId,
            subscriptionId: data.subscriptionId,
            signature: data.signature
        });
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to verify payment");
        throw error;
    }
});

// Thunk to get payment records
export const getPaymentRecord = createAsyncThunk("/payments/record", async () => {
    try {
        const response = axiosInstance.post("/payments?count=100");
        toast.promise(response, {
            loading: "Please wait! Getting all payment data...",
            success: (data) => data?.data?.message || "Payment data loaded successfully",
            error: "Failed to get payments records"
        });
        const data = await response;
        return data.data;
    } catch (error) {
        toast.error("Operation Failed");
        throw error;
    }
});

// Thunk to cancel a course bundle
export const cancelCourseBundle = createAsyncThunk("/payments/unsubscribe", async () => {
    try {
        const response = axiosInstance.post("/payments/unsubscribe");
        toast.promise(response, {
            loading: "Unsubscribing...",
            success: (data) => data?.data?.message || "Unsubscribed successfully",
            error: "Failed to unsubscribe"
        });
        const data = await response;
        return data.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to unsubscribe");
        throw error;
    }
});

// Slice definition
const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRazorPayId.fulfilled, (state, action) => {
                state.key = action?.payload?.data
            })
            .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
                state.subscriptionId = action?.payload?.data
            })
            .addCase(verifyUserPayment.fulfilled, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(verifyUserPayment.rejected, (state, action) => {
                toast.error("Payment verification failed");
                state.isPaymentVerified = false;
            })
            .addCase(getPaymentRecord.fulfilled, (state, action) => {
                state.allPayments = action?.payload?.allPayments;
                state.finalMonths = action?.payload?.finalMonths;
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(cancelCourseBundle.fulfilled, (state, action) => {
                toast.success(action?.payload?.message || "Unsubscribed successfully");
            });
    }
});

export default razorpaySlice.reducer;
