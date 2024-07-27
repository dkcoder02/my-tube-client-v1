import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function MyChannelEmptyVideoCard() {
  return (
    <>
      <div className="flex justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <p className="mb-3 w-full">
            <span className="inline-flex rounded-full bg-orange-300 p-2 text-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                ></path>
              </svg>
            </span>
          </p>
          <h5 className="mb-2 font-semibold">No videos uploaded</h5>
          <p>
            This page has yet to upload a video. Search another page in order to
            find more videos.
          </p>

          <Link to="/upload-video">
            <Button
              size="lg"
              variant="outline"
              className="mt-4 inline-flex items-center gap-x-2  bg-gray-400 hover:bg-orange-400 text-transform: uppercase px-3 py-2 font-semibold text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                ></path>
              </svg>
              New video
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
