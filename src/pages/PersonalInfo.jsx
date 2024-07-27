import LoadingBar from "react-top-loading-bar";
import { Header, Sidebar, EditPersonalInfo } from "../components";
import { useEffect, useState } from "react";

export default function PersonalInfo() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(progress + 40);
    setTimeout(() => {
      setProgress(progress + 100);
    }, 1200);
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
            <EditPersonalInfo />
          </section>
        </div>
      </div>
    </div>
  );
}
