"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

interface SidebarState {
    minimized: boolean;
}

const initialState: SidebarState = {
    minimized: false,
};

const authSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        minimize: (state) => {
            state.minimized = true;
        },
        maximize: (state) => {
            state.minimized = false;
        },
    },
});

export const { minimize, maximize } = authSlice.actions;
export default authSlice.reducer;