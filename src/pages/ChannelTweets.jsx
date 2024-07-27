import { useState } from "react";
import { Header, Sidebar, Tweets } from "../components";
import LoadingBar from "react-top-loading-bar";

export default function ChannelTweets() {
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
          <Sidebar />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <Tweets setProgress={setProgress} progress={progress} />
          </section>
        </div>
      </div>
    </div>
  );
}
