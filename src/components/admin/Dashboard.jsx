import Header from "../Header";
import { Link } from "react-router-dom";
import EditVideoPopup from "./EditVideoPopup";
import { useEffect, useState } from "react";
import DeleteVideoPopup from "./DeleteVideoPopup";
import moment from "moment";
import videoService from "../../services/Video/video";
import LoadingBar from "react-top-loading-bar";
import { Button } from "../ui/button.jsx";

function Dashboard() {
  const channelInfo = JSON.parse(localStorage.getItem("user"));
  const [editVideoModelActive, setEditVideoModelActive] = useState(false);
  const [deleteVideoModelActive, setDeleteVideoModelActive] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [megaResponse, setMegaResponse] = useState([]);
  const [deleteVideoId, setDeleteVideoId] = useState("");
  const [reload, setReload] = useState(false);
  const [progress, setProgress] = useState(0);
  const dashboardData = megaResponse;

  const toggleVideoSelection = async (videoId, publishStatus) => {
    try {
      await videoService.videoPublishStatus(videoId, !publishStatus);
      setReload(!reload);
    } catch (error) {
      console.log("Toogle publish video functionality::", error);
    }
  };

  const handleEditVideo = async (videoInfo) => {
    setEditVideoModelActive(true);
    setVideoData(videoInfo);
  };

  useEffect(() => {
    (async () => {
      try {
        setProgress(progress + 30);
        const channelDashboard =
          await videoService.getChannelStatsInformation();
        const channelVideos = await videoService.getChannelAllVideos();
        if (channelDashboard && channelVideos) {
          setProgress(progress + 50);
          const megaResponse = {
            channelStats: channelDashboard.data.data,
            channelVideos: channelVideos.data.data,
          };
          setMegaResponse(megaResponse);
          setProgress(progress + 100);
        }
      } catch (error) {
        setProgress(0);
      }
    })();
  }, [reload]);

  return (
    <>
      <LoadingBar
        height={2}
        color={"#2998ff"}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Header />
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]  bg-[#121212]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-y-6 px-4 py-8">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="block">
              <h1 className="text-2xl font-bold">
                Welcome Back,{channelInfo?.userName}
              </h1>
              <p className="text-sm text-gray-300">
                Seamless Video Management, Elevated Results.
              </p>
            </div>
            <div className="block">
              <Link to="/upload-video">
                <Button
                  size="lg"
                  variant="outline"
                  className="inline-flex items-center gap-x-2 bg-gray-400 hover:bg-orange-400 px-3 py-2 text-transform: uppercase font-semibold text-black"
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
                  Upload Video
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
            <div className="border p-4">
              <div className="mb-4 block">
                <span className="inline-block h-7 w-7 rounded-full bg-[#fcbf6a] p-1 text-orange-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </span>
              </div>
              <h6 className="text-gray-300">Total views</h6>
              <p className="text-3xl font-semibold">
                {dashboardData?.channelStats?.totalViews}
              </p>
            </div>
            <div className="border p-4">
              <div className="mb-4 block">
                <span className="inline-block h-7 w-7 rounded-full bg-[#fcbf6a] p-1 text-orange-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    ></path>
                  </svg>
                </span>
              </div>
              <h6 className="text-gray-300">Total subscribers</h6>
              <p className="text-3xl font-semibold">
                {dashboardData?.channelStats?.totalSubscribers || 0}
              </p>
            </div>
            <div className="border p-4">
              <div className="mb-4 block">
                <span className="inline-block h-7 w-7 rounded-full bg-[#fcbf6a] p-1 text-orange-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    ></path>
                  </svg>
                </span>
              </div>
              <h6 className="text-gray-300">Total likes</h6>
              <p className="text-3xl font-semibold">
                {dashboardData?.channelStats?.totalLikes || 0}
              </p>
            </div>
          </div>
          <div className="w-full overflow-auto">
            {dashboardData?.channelVideos?.totalVideos !== 0 ? (
              <table className="w-full min-w-[1200px] border-collapse border text-white">
                <thead>
                  <tr>
                    <th className="border-collapse border-b p-4">Status</th>
                    <th className="border-collapse border-b p-4">Status</th>
                    <th className="border-collapse border-b p-4">Uploaded</th>
                    <th className="border-collapse border-b p-4">Rating</th>
                    <th className="border-collapse border-b p-4">
                      Date uploaded
                    </th>
                    <th className="border-collapse border-b p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.channelVideos?.channelVideos.map((video) => (
                    <tr className="group border" key={video._id}>
                      <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                        <div
                          className="flex justify-center"
                          htmlFor={video._id}
                        >
                          <label
                            key={video._id}
                            className="relative inline-block w-12 cursor-pointer overflow-hidden"
                          >
                            <input
                              type="checkbox"
                              className="peer sr-only"
                              defaultChecked={video.isPublished}
                              id={video._id}
                              onChange={(e) =>
                                toggleVideoSelection(
                                  video._id,
                                  e.target.checked
                                )
                              }
                            />
                            <span className="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-orange-500 peer-checked:after:left-7"></span>
                          </label>
                        </div>
                      </td>
                      <td
                        key={video._id}
                        className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none"
                      >
                        <div className="flex justify-center items-center">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                              video.isPublished
                                ? "bg-green-100 text-green-600 border border-green-600"
                                : "bg-red-100 text-red-600 border border-red-600"
                            }`}
                          >
                            <svg
                              className={`w-4 h-4 mr-1 ${
                                video.isPublished
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              {video.isPublished ? (
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              ) : (
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.707-11.293a1 1 0 00-1.414 0L10 10.586 6.707 7.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l6-6z"
                                  clipRule="evenodd"
                                />
                              )}
                            </svg>
                            {video.isPublished ? "Public" : "Private"}
                          </span>
                        </div>
                      </td>
                      <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                        <div className="flex items-center gap-4">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={video.thumbnail[0].url}
                            alt="Code Master"
                          />
                          <h3 className="font-semibold">{video.title}</h3>
                        </div>
                      </td>
                      <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                        <div className="flex justify-center gap-4">
                          <span className="inline-block rounded-xl bg-green-200 px-2 py-1 text-green-700">
                            {video.likes}
                            {""}likes
                          </span>
                        </div>
                      </td>
                      <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                        {moment(video.updatedAt).format("MM/DD/YYYY")}
                      </td>
                      <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                        <div className="flex gap-4">
                          <button
                            className="h-5 w-5 hover:text-orange-500"
                            onClick={() => {
                              setDeleteVideoModelActive(true);
                              setDeleteVideoId(video._id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              ></path>
                            </svg>
                          </button>
                          <button
                            className="h-5 w-5 hover:text-orange-500"
                            onClick={() => handleEditVideo(video)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center h-96">
                <p className="text-gray-300 text-xl">No videos uploaded yet</p>
              </div>
            )}
          </div>
          {editVideoModelActive && (
            <EditVideoPopup
              setEditVideoModelActive={setEditVideoModelActive}
              video={videoData}
              setReload={setReload}
              reload={reload}
            />
          )}
          {deleteVideoModelActive && (
            <DeleteVideoPopup
              setDeleteVideoModelActive={setDeleteVideoModelActive}
              videoId={deleteVideoId}
              setReload={setReload}
              reload={reload}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
