import moment from "moment";
import { formatVideoDuration } from "../../helper/utils";

export default function VideoListCard({ video }) {
  return (
    <div className="w-full max-w-3xl mb-6 gap-x-4  md:flex" key={video._id}>
      <div className="relative mb-2  w-full md:mb-0 md:w-5/12">
        <div className="w-full pt-[56%]">
          <div className="absolute inset-0">
            <img
              src={video.thumbnail[0].url}
              alt={video.title}
              className="h-full w-full"
            />
          </div>
          <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
            {formatVideoDuration(video.duration)}
          </span>
        </div>
      </div>
      <div className="flex gap-x-2 md:w-7/12">
        <div className="h-10 w-10 shrink-0 md:hidden">
          <img
            src={video.owner?.avatar}
            alt={video.owner?.userName}
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="w-full">
          <h6 className="mb-1 font-semibold md:max-w-[75%]">{video.title}</h6>
          <p className="flex text-sm text-gray-200 sm:mt-3">
            {video.views} Views · {moment(`${video.createdAt}`).fromNow()}
          </p>
          <div className="flex items-center gap-x-4">
            <div className="mt-2 hidden h-10 w-10 shrink-0 md:block">
              <img
                src={video.owner?.avatar}
                alt={video.owner?.userName}
                className="h-full w-full rounded-full"
              />
            </div>
            <p className="text-sm text-gray-200">{video.owner?.userName}</p>
          </div>
          <p className="mt-2 hidden text-sm md:block">
            {video.description.substring(0, 100)}
          </p>
        </div>
      </div>
    </div>
  );
}
