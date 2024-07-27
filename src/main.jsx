import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Home,
  Login,
  SignUp,
  WatchVideo,
  VideoListView,
  ChannelVideoList,
  ChannelPlaylist,
  ChannelPlaylistVideo,
  ChannelTweets,
  ChannelSubscribed,
  UploadVideosModel,
  PersonalInfo,
  ChannelInfoEdit,
  PasswordEdit,
  UploadingVideoPopup,
  WatchHistory,
  VideoLikes,
  MyTubeDashboard,
} from "./pages/index.js";
import store from "./store/store.js";
import { Provider } from "react-redux";
import videoService from "./services/Video/video.js";
import { Toaster } from "@/components/ui/toaster";
import { AuthLayout } from "./components/index.js";
import { Analytics } from "@vercel/analytics/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/watch/:videoId",
        element: <WatchVideo />,
      },
      {
        path: "/video-list",
        element: (
          <AuthLayout authentication>
            <VideoListView />
          </AuthLayout>
        ),
      },
      {
        path: "/my/studio",
        element: (
          <AuthLayout authentication>
            <MyTubeDashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/history",
        element: (
          <AuthLayout authentication>
            <WatchHistory />
          </AuthLayout>
        ),
      },
      {
        path: "/likes",
        element: (
          <AuthLayout authentication>
            <VideoLikes />
          </AuthLayout>
        ),
      },
      {
        path: "/upload-video",
        element: (
          <AuthLayout authentication>
            <UploadVideosModel />
          </AuthLayout>
        ),
      },
      {
        path: "/channel",
        element: (
          <AuthLayout authentication>
            <ChannelVideoList />
          </AuthLayout>
        ),
      },
      {
        path: "/personal-info-edit",
        element: (
          <AuthLayout authentication>
            <PersonalInfo />
          </AuthLayout>
        ),
      },
      {
        path: "/channel-info-edit",
        element: (
          <AuthLayout authentication>
            <ChannelInfoEdit />
          </AuthLayout>
        ),
      },
      {
        path: "/auth-info-edit",
        element: (
          <AuthLayout authentication>
            <PasswordEdit />
          </AuthLayout>
        ),
      },
      {
        path: "/tweets/:userId",
        element: (
          <AuthLayout authentication>
            <ChannelTweets />
          </AuthLayout>
        ),
        loader: async ({ params }) => {
          const response = await videoService.getUserTweets(params.userId);
          return response.data;
        },
      },
      {
        path: "/subscribed/:channelId",
        element: (
          <AuthLayout authentication>
            <ChannelSubscribed />
          </AuthLayout>
        ),
        loader: async ({ params }) => {
          const channelsData = await videoService.getChannelList();
          if (channelsData.status === 200) {
            const channelId = params.channelId;
            const response = {
              data: channelsData.data.data,
              channelId,
            };
            return response;
          }
          return;
        },
      },
      {
        path: "/playlist",
        element: (
          <AuthLayout authentication>
            <ChannelPlaylist />
          </AuthLayout>
        ),
      },
      {
        path: "/uploading",
        element: (
          <AuthLayout authentication>
            <UploadingVideoPopup />
          </AuthLayout>
        ),
      },
      {
        path: "/playlist-videos/:playlistId/:userId",
        element: (
          <AuthLayout authentication>
            <ChannelPlaylistVideo />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
      <Analytics />
    </Provider>
  </React.StrictMode>
);
