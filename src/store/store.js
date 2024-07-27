import { configureStore } from "@reduxjs/toolkit";
import channelSlice from "./channelSlice";

const store = configureStore({
  reducer: {
    channel: channelSlice,
  },
});

export default store;
