import {
  Header,
  Sidebar,
  ChannelCard,
  SecondHeader,
  VideoCard,
  MyChannelEmptyVideoCard,
} from "../components";
import { useSelector } from "react-redux";
import { useVideos } from "../hooks/useVideos.js";
import LoadingBar from "react-top-loading-bar";

export default function ChannelVideoList() {
  const isEmptyVideo = useSelector((state) => state.channel.isEmptyVideo);
  const authInfo = localStorage.getItem("user");
  const isAuthenticate = authInfo?._id ? true : false;
  const [videos, error, progress] = useVideos();

  if (error) {
    return <h1 className="text-center text-red-500">{error}</h1>;
  }

  return (
    <div>
      <LoadingBar height={2} color={"#2998ff"} progress={progress} />
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <Header />
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Sidebar />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <ChannelCard />
            <SecondHeader />
            {!isEmptyVideo ? (
              <VideoCard videos={videos} isAuthenticate={isAuthenticate} />
            ) : (
              <MyChannelEmptyVideoCard />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
