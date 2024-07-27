import { useState } from "react";
import { Header, Sidebar, LikedVideoList } from "../components";
import LoadingBar from "react-top-loading-bar";

export default function VideoLikes() {
  const [progress, setProgress] = useState(0);
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
          <Sidebar defaultStyle="" defaultSpanStyle="" />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
            <LikedVideoList setProgress={setProgress} progress={progress} />
          </section>
        </div>
      </div>
    </div>
  );
}