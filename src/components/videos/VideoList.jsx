import VideoListCard from "../cards/VideoListCard";

export default function VideoList() {
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <VideoListCard />
        <VideoListCard />
      </div>
    </>
  );
}
