import toast from "react-hot-toast"
import axiosInstance from "../../Helper/AxiosInstance"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    key: "",
    subscriptionId: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths:{},
    monthlySalesRecord: []
}

export const getRazorPayId = createAsyncThunk("/getId", async() =>{
    try {
        const response = axiosInstance.get("/payments/razorpay-key");
        return response.data
    } catch (error) {
        toast.error("Failed to load data");
    }
});


export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async() =>{
    try {
        const response =await axiosInstance.post("/payments/subscribe");
        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const verifyUserPayment = createAsyncThunk("/payments/verify", async(data) =>{
    try {
        const response = await axiosInstance.post("/payments/verify", {
            paymentId: data.paymentId,
            subscriptionId: data.subscriptionId,
            signature: data.signature
        });
        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const getPaymentRecord = createAsyncThunk("/payments/record", async() =>{
    try {
        const response = axiosInstance.post("/payments?count=100");
        toast.promise(response, {
            loading: "Pease wait! getting all payment data",
            success: (data) =>{
                return data?.data?.message
            },
            error: "Failed to get payments records"
        })
        return (await response).data
    } catch (error) {
        toast.error("Operation Failed");
    }
})

export const cancelCourseBundle = createAsyncThunk("/payments/unsubscribe", async() =>{
    try {
        const response = axiosInstance.post("/payments/unsubscribe");
        toast.promise(response, {
            loading: "Unsubscribing",
            success: (data) =>{
                return data?.data?.message
            },
            error: "Failed to Unsubscribe"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})
const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRazorPayId.fulfilled, (state, action) =>{
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
            state.subscriptionId = action?.payload.subscriptionId;
        })
        .addCase(verifyUserPayment.fulfilled, (state, action) =>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success
        })
        .addCase(verifyUserPayment.rejected, (state, action) =>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success
        })
        .addCase(getPaymentRecord.fulfilled, (state, action) =>{
            state.allPayments = action?.payload?.allPayments
            state.finalMonths = action?.payload?.finalMonths
            state.isPaymentVerified = action?.payload?.success
        })
    }
})

export default razorpaySlice.reducer;