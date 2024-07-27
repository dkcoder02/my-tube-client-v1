import { useSelector } from "react-redux";
import {
  Header,
  Sidebar,
  UploadVideos,
  VideoCard,
  MyChannelEmptyVideoCard,
} from "../components";
import { useVideos } from "../hooks/useVideos";

export default function UploadVideosModel() {
  const [videos, error] = useVideos();
  const authInfo = localStorage.getItem("user");
  const isAuthenticate = authInfo?._id ? true : false;

  if (error) {
    return <h1 className="text-center text-red-500">{error}</h1>;
  }
  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      <Header />
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Sidebar />
        <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <UploadVideos />
          {videos.length !== 0 ? (
            <VideoCard videos={videos} isAuthenticate={isAuthenticate} />
          ) : (
            <MyChannelEmptyVideoCard />
          )}
        </section>
      </div>
    </div>
  );
}
