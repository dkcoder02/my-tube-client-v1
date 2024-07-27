import { useEffect, useId, useState } from "react";
import VideoListCard from "../cards/VideoListCard";
import authService from "../../services/Auth/auth";
import VideoSkeleton from "../VideoSkeleton";

export default function History({ setProgress, progress }) {
  const [watchHistory, setWatchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const id = useId();
  useEffect(() => {
    (async () => {
      setProgress(progress + 30);
      setLoading(true);
      const response = await authService.getWatchHistory();
      if (response && response.data?.success === true) {
        response
          ? setWatchHistory(response.data.data.watchHistory)
          : setWatchHistory([]);
      }
      setProgress(progress + 50);
      setTimeout(() => {
        setProgress(progress + 100);
        setLoading(false);
      }, 1200);
    })();
  }, []);

  return (
    <>
      {watchHistory && watchHistory?.length > 0 ? (
        <div
          className="flex flex-col gap-4 p-4 justify-center mt-16 items-center"
          key={id}
        >
          <h1 className="text-gray-300 text-2xl pb-16 hover:text-orange-400">
            Your Watch History
          </h1>
          {watchHistory.map((video) =>
            loading ? (
              <VideoSkeleton />
            ) : (
              <VideoListCard video={video} key={video._id} />
            )
          )}
        </div>
      ) : (
        <p className="text-center mt-24 text-gray-300 text-2xl hover:text-orange-400">
          No watch History
        </p>
      )}
    </>
  );
}
