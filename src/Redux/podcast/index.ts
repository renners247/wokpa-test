import { PodcastModel } from "@/models/podcast";
import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

//stores first podcast page for subsequent access

export interface IPodcastState {
    refresh: string,
    podcasts: {
        content: PodcastModel[];
        // currentPage: number;
        // perPage: number;
        // totalContent: number;
    },
}

const initialState: IPodcastState = {
    refresh: "",
    podcasts: {
        content: [],
        // currentPage: 1,
        // perPage: 20,
        // totalContent: 0
    },
};

const podcastSlice = createSlice({
    name: "podcast",
    initialState,
    reducers: {
        resetPodcast: () => {
            return initialState;
        },
        // updatePodcasts: (state, action: PayloadAction<{ podcasts: PodcastModel[], currentPage: number, totalContent: number }>) => {

        //     const { podcasts, currentPage, totalContent } = action.payload;
        //     const filtered = podcasts.filter((val) => {
        //         return state.podcasts.content.find(_val => val.id == _val.id) ? false : true;
        //     });

        //     if (currentPage == state.podcasts.currentPage) {
        //         const newPodcasts: PodcastModel[] = [];
        //         podcasts.forEach((podcast) => {
        //             const _f = state.podcasts.content.find(_v => _v.id == podcast.id);
        //             if (_f) {
        //                 let _podcast = podcast;
        //                 // _podcast.episodes = _f.episodes;
        //                 newPodcasts.push(_podcast)
        //             } else {
        //                 newPodcasts.push(podcast)
        //             }
        //         });
        //         state.podcasts.content = newPodcasts;

        //     } else {
        //         state.podcasts.content.push(...filtered);
        //     }

        //     state.podcasts.currentPage = action.payload.currentPage;
        //     state.podcasts.totalContent = action.payload.totalContent;
        // },
        refreshPodcasts: (state, action: PayloadAction<string>) => {
            state.refresh = action.payload;
        },

        pushPodcasts: (state, action: PayloadAction<{ podcasts: PodcastModel[] }>) => {
            const podcasts = [...state.podcasts.content, ...action.payload.podcasts]
            state.podcasts.content = action.payload.podcasts;
            // state.podcasts.currentPage = action.payload.currentPage;
            // state.podcasts.totalContent = action.payload.totalContent;
        },

    },
});

export const { resetPodcast, pushPodcasts, refreshPodcasts } = podcastSlice.actions;
export default podcastSlice.reducer;