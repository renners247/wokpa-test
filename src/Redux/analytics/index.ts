"use client";

import { AnalyticsModel } from "@/models/Analytics";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { profile } from "console";


interface AnalyticsState {
    analytics: AnalyticsModel
}

const initialState: AnalyticsState = {
    analytics: {
        total_income: 0,
        follower_count: 0,
        listener_count: 0,
    }
};

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {
        resetAnalytics: () => {
            return initialState;
        },
        updateAnalytics: (state, action: PayloadAction<AnalyticsModel>) => {
            state.analytics = action.payload;
        },

    },
});

export const { resetAnalytics, updateAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer; 