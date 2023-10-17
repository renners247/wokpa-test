import { PlaybackData } from "@/models/playback";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";


type PlaylistMode = "radio" | "podcast"

interface IPlaylistState {
    playbackData: PlaybackData

}

const initialState: IPlaylistState = {
    playbackData: {
        rate: 1,
        playing: false,
        paused: false,
        duration: "",
        volume: 1,
        durationSeconds: 0,
        playtimeSeconds: 0,
        playtimeCap: 0,
        playtime: "",
        loading: false,
    }
};

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },

        updatePlaybackData: (state, action: PayloadAction<{ playbackData: PlaybackData }>) => {
            state.playbackData = action.payload.playbackData
        }
    },
});


export const { reset, updatePlaybackData, } = playlistSlice.actions;
export default playlistSlice.reducer;