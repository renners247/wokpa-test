"use client";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/setup/redux/store";
import { RootState } from "@/setup/redux/root-reducer";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();