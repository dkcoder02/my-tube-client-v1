import React, { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import videoService from "../../../services/Video/video";
import { formatVideoDuration } from "../../../helper/utils";

export default function PlaylistVideos({ setProgress, progress }) {
  const authInfo = JSON.parse(localStorage.getItem("user"));
  const { state } = useLocation();
  const { userId, playlistId } = useParams();
  const [playlistVideos, setPlaylistVideos] = useState([]);

  const fetchPlaylistVideos = async () => {
    try {
      setProgress(progress + 30);
      const channelPlayListVideos = await videoService.getVideoPlaylistByUserId(
        userId
      );
      setProgress(progress + 50);
      if (channelPlayListVideos.status === 200) {
        const playListVideo = channelPlayListVideos.data.data.filter(
          (playlist) => playlist._id === playlistId
        );
        setPlaylistVideos(state?.channelPlaylist[0] || playListVideo[0]);
      }
    } catch (error) {
      console.log("fetchPlaylistVideos Error::", error);
    } finally {
      setProgress(progress + 100);
    }
  };

  useEffect(() => {
    fetchPlaylistVideos();
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
        {playlistVideos.videos && (
          <div className="w-full shrink-0 sm:max-w-md xl:max-w-sm">
            <div className="relative mb-2 w-full pt-[56%]">
              <div className="absolute inset-0">
                <img
                  src={playlistVideos.videos[0].thumbnail[0].url}
                  alt={playlistVideos.videos[0].title}
                  className="h-full w-full"
                />
                <div className="absolute inset-x-0 bottom-0">
                  <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                    <div className="relative z-[1]">
                      <p className="flex justify-between">
                        <span className="inline-block">Playlist</span>
                        <span className="inline-block">
                          {playlistVideos.videos.length} videos
                        </span>
                      </p>
                      <p className="text-sm text-gray-200">
                        {/* 100K Views · {" "} */}
                        {moment(`${playlistVideos.createdAt}`).fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h6 className="mb-1 font-semibold">
              {playlistVideos.videos[0].title}
            </h6>
            <p className="flex text-sm text-gray-200">
              {playlistVideos.videos[0].description}
            </p>
            <div className="mt-6 flex items-center gap-x-3">
              <div className="h-16 w-16 shrink-0">
                <img
                  src={authInfo.avatar}
                  alt={authInfo.userName}
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full">
                <h6 className="font-semibold">{authInfo.userName}</h6>
                <p className="text-sm text-gray-300">757K Subscribers</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full flex-col gap-y-4">
          {playlistVideos?.videos
            ? playlistVideos.videos.map((video) => (
                <Link to={`/watch/${video._id}`} state={{ videos: video }}>
                  <div className="border cursor-pointer" key={video._id}>
                    <div className="w-full max-w-3xl gap-x-4 sm:flex">
                      <div className="relative mb-2 w-full sm:mb-0 sm:w-5/12">
                        <div className="w-full pt-[56%]">
                          <div className="absolute inset-0">
                            <img
                              src={video.thumbnail[0].url}
                              alt={video.title}
                              className="h-full w-full"
                            />
                          </div>
                          <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                            {formatVideoDuration(video.duration)}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-x-2 px-2 sm:w-7/12 sm:px-0">
                        <div className="h-10 w-10 shrink-0 sm:hidden">
                          <img
                            src={video.owner.avatar}
                            alt={video.owner.userName}
                            className="h-full w-full rounded-full"
                          />
                        </div>
                        <div className="w-full">
                          <h6 className="mb-1 font-semibold sm:max-w-[75%]">
                            {video.title}
                          </h6>
                          <p className="flex text-sm text-gray-200 sm:mt-3">
                            {video.views} Views ·{" "}
                            {moment(`${video.createdAt}`).fromNow()}
                          </p>
                          <div className="flex items-center gap-x-4">
                            <div className="mt-2 hidden h-10 w-10 shrink-0 sm:block">
                              <img
                                src={video.owner.avatar}
                                alt={video.owner.userName}
                                className="h-full w-full rounded-full"
                              />
                            </div>
                            <p className="text-sm text-gray-200">
                              {video.owner.userName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            : ""}
        </div>
      </div>
    </>
  );
}
