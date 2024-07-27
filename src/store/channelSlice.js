import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  channelInfo: null,
  isEditActive: false,
  isEmptyVideo: false,
  isLikedVideos: [],
  isEditPersonalInfo: false,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    ownChannelData: (state, action) => {
      state.status = true;
      state.channelInfo = action.payload;
    },
    editIsActive: (state, action) => {
      state.isEditActive = action.payload;
    },
    isEmptyVideos: (state, action) => {
      state.isEmptyVideo = action.payload;
    },
    isLikedVideoData: (state, action) => {
      state.isLikedVideos = action.payload;
    },
    editPersonalInfo: (state, action) => {
      state.isEditPersonalInfo = action.payload;
    },
  },
});

export const {
  ownChannelData,
  editIsActive,
  isEmptyVideos,
  isLikedVideoData,
  editPersonalInfo,
} = channelSlice.actions;

export default channelSlice.reducer;
