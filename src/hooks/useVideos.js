import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import videoService from "../services/Video/video";
function useVideos() {
  const authInfo = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState("");
  const [videos, setVideos] = useState([]);
  const [progress, setProgress] = useState(0);
  const { state } = useLocation();

  useEffect(() => {
    (async () => {
      setError("");
      setProgress(progress + 30);
      try {
        const userId = authInfo?._id;
        const ownChannelVideos = await videoService.getAllVideos({
          userId: userId,
        });
        setProgress(progress + 50);
        if (ownChannelVideos) setVideos(ownChannelVideos.data.data.videos);
      } catch (error) {
        setError(error.message);
      } finally {
        setTimeout(() => {
          setProgress(progress + 100);
        }, 1200);
      }
    })();
  }, [state?.uploaded]);
  return [videos, error, progress];
}

export { useVideos };
