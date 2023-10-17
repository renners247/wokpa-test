"use client";

import { combineReducers } from 'redux';
import authReducer from '@/redux/auth';
import sidebarReducer from '@/redux/sidebar';
import playerReducer from '@/redux/player'
import podcastsReducer from '@/redux/podcast'
import analyticsReducer from '@/redux/analytics'



export const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    auth: authReducer,
    audioPlayer: playerReducer,
    podcasts: podcastsReducer,
    analytics: analyticsReducer

});
export type RootState = ReturnType<typeof rootReducer>;