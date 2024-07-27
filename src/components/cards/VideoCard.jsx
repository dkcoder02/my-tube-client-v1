import moment from "moment";
import { Link } from "react-router-dom";
import videoService from "../../services/Video/video";
import VideoSkeleton from "../VideoSkeleton";
import { formatVideoDuration } from "../../helper/utils";

export default function VideoCard({ videos, isLoading, isAuthenticate }) {
  const handleWatchVideo = async (videoId) => {
    try {
      if (isAuthenticate) {
        await videoService.watchVideo(videoId);
      }
    } catch (error) {
      console.log("Error::", error);
    }
  };
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
        {videos && videos.length !== 0
          ? videos.map((channelVideos, i) => (
              <div className="w-full" key={i}>
                {isLoading ? (
                  <VideoSkeleton />
                ) : (
                  <Link
                    to={`/watch/${channelVideos._id}`}
                    onClick={() => handleWatchVideo(channelVideos._id)}
                    state={{ videos: channelVideos }}
                  >
                    <div className="relative mb-2 w-full pt-[56%]">
                      <div className="absolute inset-0">
                        <img
                          src={channelVideos.thumbnail[0].url}
                          alt="thumbnail"
                          className="h-full w-full"
                        />
                      </div>
                      <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                        {formatVideoDuration(channelVideos.duration)}
                      </span>
                    </div>
                    <div className="flex gap-x-2">
                      <div className="h-10 w-10 shrink-0">
                        <img
                          src={channelVideos.owner.avatar}
                          alt="avatar"
                          className="h-full w-full rounded-full"
                        />
                      </div>
                      <div className="w-full">
                        <h6 className="mb-1 font-semibold">
                          {channelVideos.title}
                        </h6>
                        <p className="flex text-sm text-gray-200">
                          {channelVideos.views} Views ·{" "}
                          {moment(`${channelVideos.createdAt}`).fromNow()}
                        </p>
                        <p className="text-sm text-gray-200">
                          {channelVideos.owner.userName}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            ))
          : ""}
      </div>
    </>
  );
}
