import { useState, useEffect } from "react";
import { Header, Sidebar, VideoCard } from "../components";
import videoService from "../services/Video/video";
import LoadingBar from "react-top-loading-bar";

export default function Home() {
  const authInfo = localStorage.getItem("user");
  const isAuthenticate = authInfo?._id ? true : false;
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        setProgress(progress + 30);

        if (!isAuthenticate) {
          const videoAppVideos = await videoService.getAllAppVideos("desc");
          setVideos(videoAppVideos.data.data.videos);
          return;
        }
        const allVideos = await videoService.getAllVideos({
          sortType: "uploadDate",
        });

        if (allVideos) setVideos(allVideos.data.data.videos);
      } catch (error) {
        console.log(error.message);
      } finally {
        setProgress(progress + 50);
        setTimeout(() => {
          setIsLoading(false);
          setProgress(progress + 100);
        }, 1200);
      }
    })();
  }, []);

  return (
    <div>
      <LoadingBar
        height={2}
        color={"#2998ff"}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <Header />
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Sidebar />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <VideoCard
              videos={videos}
              isLoading={isLoading}
              isAuthenticate={isAuthenticate}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
