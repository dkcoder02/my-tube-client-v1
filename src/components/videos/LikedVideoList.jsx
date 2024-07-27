import { useEffect, useState } from "react";
import VideoListCard from "../cards/VideoListCard";
import videoService from "../../services/Video/video";
import VideoSkeleton from "../VideoSkeleton";

export default function LikedVideoList({ setProgress, progress }) {
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setProgress(progress + 30);
        setLoading(true);
        const userLikedVideos = await videoService.getLikedVideos();
        if (userLikedVideos) {
          setLikedVideos(userLikedVideos.data.data[0]?.likedvideos);
        }
        setProgress(progress + 50);
      } catch (error) {
        console.log("Error::", error);
      } finally {
        setTimeout(() => {
          setProgress(progress + 100);
          setLoading(false);
        }, 1200);
      }
    })();
  }, []);

  return likedVideos?.length > 0 ? (
    <div className="flex flex-col gap-4 p-4 justify-center mt-16 items-center">
      <h1 className="text-gray-300 text-2xl pb-16 hover:text-orange-400">
        Your Liked Videos
      </h1>
      {likedVideos.map((video) =>
        loading ? (
          <VideoSkeleton />
        ) : (
          <VideoListCard video={video} key={video._id} loading={loading} />
        )
      )}
    </div>
  ) : (
    <p className="text-center mt-24 text-gray-300 text-2xl hover:text-orange-400">
      No Liked Videos
    </p>
  );
}
