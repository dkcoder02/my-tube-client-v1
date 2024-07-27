import {
  Header,
  Sidebar,
  UploadingVideoPopup as UploadingModel,
  ChannelCard,
  SecondHeader,
} from "../components";

export default function UploadingVideoPopup() {
  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      <Header />
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Sidebar />
        <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <ChannelCard />
          <SecondHeader />
          <UploadingModel />
        </section>
      </div>
    </div>
  );
}
