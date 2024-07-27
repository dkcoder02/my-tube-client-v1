import { Header, Sidebar, VideoList } from "../components";

export default function VideoListView() {
  return (
    <div>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <Header />
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Sidebar />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <VideoList />
          </section>
        </div>
      </div>
    </div>
  );
}
