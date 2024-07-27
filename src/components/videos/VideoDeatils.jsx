import moment from "moment";
import { useState, useRef, useEffect, useMemo, Suspense, lazy } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import videoService from "../../services/Video/video";
import { useSelector } from "react-redux";
import { VideoJS } from "../VideoJS.jsx";
import { useToast } from "@/components/ui/use-toast";
import { useDebounceValue } from "usehooks-ts";
import { Button } from "../ui/button.jsx";
import { formatVideoDuration } from "../../helper/utils.js";
import { ToastAction } from "@/components/ui/toast";
import ToggleVideoLike from "../ToggleVideoLike.jsx";
import VideoSkeleton from "../VideoSkeleton.jsx";

export default function VideoDeatils({
  isAuthenticate,
  setProgress,
  progress,
}) {
  const { videoId } = useParams();
  const authInfo = JSON.parse(localStorage.getItem("user"));
  const { state } = useLocation();
  const [videoComments, setVideoComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [commentId, setCommentId] = useState([]);
  const [videos, setVideos] = useState([]);
  const [playListName, setPlayListName] = useState("");
  const [channelPlayListData, setChannelPlayListData] = useState([]);
  const [video, setVideo] = useState(state?.videos);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(
    state?.videos?.owner.isSubscribe
  );

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const debouncedPlaylistName = useDebounceValue(playListName, 500);
  const { toast } = useToast();

  const videoFile = video?.videoFile;
  const videoThumbnail = video?.thumbnail;

  const videoJsOptions = useMemo(() => {
    const src = videoFile && videoFile[0] ? videoFile[0].url : "";
    const poster =
      videoThumbnail && videoThumbnail[0] ? videoThumbnail[0].url : "";

    return {
      autoplay: true,
      controls: true,
      sources: [
        {
          src: src,
          type: "video/mp4",
        },
      ],
      poster: poster,
      controlBar: {
        skipButtons: {
          forward: 10,
          backward: 10,
        },
      },
      playbackRates: [0.5, 1, 1.5, 2],
      responsive: true,
      fluid: true,
    };
  }, [videoFile, videoThumbnail]);

  const handleAddVideoComments = async (e) => {
    try {
      if (!isAuthenticate) {
        navigate("/login");
        return;
      }

      const content = e.target.value.trim();
      const videoComment = await videoService.addCommentOnVideo({
        videoId,
        content,
      });

      setCommentId(videoComment.data.data._id);
      toast({
        description: "Comment added successfully!",
        className:
          "bg-orange-500 border border-orange-300 text-black text-3xl font-semibold",
        duration: 1500,
      });
      inputRef.current.value = "";
    } catch (error) {
      const msg = error.response?.data?.msg || error.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: msg.toUpperCase(),
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const fetchVideoComments = async () => {
    if (videoId) {
      const getVideosComment = await videoService.getCommentOnVideo({
        videoId,
      });
      if (getVideosComment && getVideosComment.data.success == true) {
        setVideoComments(getVideosComment.data.data?.comments);
      }
    }
  };

  const handleAddNewPlaylist = async () => {
    try {
      if (!isAuthenticate) {
        navigate("/login");
        return;
      }
      const name = debouncedPlaylistName[0].trim();
      if (name) {
        await videoService.createVideoPlaylist({
          name,
        });
      }
      setPlayListName("");
      setButtonDisabled(false);
    } catch (error) {
      console.log("handleAddNewPlaylist Error", error);
    }
  };

  const handleAddVideoToPlaylist = async (isChecked, playListId) => {
    try {
      if (!isAuthenticate) {
        navigate("/login");
        return;
      }
      isChecked === false && playListId
        ? await videoService.removeVideosToPlaylist({ videoId, playListId })
        : await videoService.addVideosToPlaylist({
            videoId,
            playListId,
          });
    } catch (error) {
      console.log("handleAddVideoToPlaylist Error", error);
    }
  };

  const handleWatchVideo = async (videoId) => {
    if (isAuthenticate) {
      return await videoService.watchVideo(videoId);
    }
  };

  const fetchChannelPlaylistInfo = async () => {
    try {
      if (!isAuthenticate) return;

      const userId = authInfo._id;
      const channelPlaylists = await videoService.getVideoPlaylistByUserId(
        userId
      );

      if (channelPlaylists && channelPlaylists.status === 200) {
        setChannelPlayListData(channelPlaylists.data.data);
      }
    } catch (error) {
      console.log("Fetch PlayDetails", error);
    }
  };

  const fetchAllVideos = async () => {
    try {
      setIsLoading(true);
      setProgress(progress + 30);

      let videoAppVideos;

      if (!isAuthenticate) {
        videoAppVideos = await videoService.getAllAppVideos("asc");
      }

      if (isAuthenticate) {
        videoAppVideos = await videoService.getAllVideos({});
      }

      setProgress(progress + 50);

      if (videoAppVideos) {
        const videoData = videoAppVideos.data.data.videos;
        const response = videoData.filter((video) => video._id !== videoId);
        const video = videoData.filter((video) => video._id === videoId);
        setVideo(video[0]);
        setIsSubscribe(video[0]?.owner.isSubscribe);
        setVideos(response);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setProgress(progress + 100);
      }, 700);
    }
  };

  const handleToggleSubscription = async (channelId) => {
    try {
      if (!isAuthenticate) {
        navigate("/login");
        return;
      }

      setIsSubscribe(!isSubscribe);
      await videoService.toggleSubscribe(channelId);
    } catch (error) {
      console.log("handleToggleSubscription Error", error);
    }
  };

  useEffect(() => {
    fetchChannelPlaylistInfo();
  }, [debouncedPlaylistName[0]]);

  useEffect(() => {
    fetchVideoComments();
  }, [commentId, videoId]);

  useEffect(() => {
    fetchAllVideos();
    handleWatchVideo(videoId);
  }, [videoId]);

  return (
    <>
      {video && (
        <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
          <div className="col-span-12 w-full">
            <div className="relative mb-4 w-full pt-[56%]">
              {videoFile && (
                <div className="absolute inset-0">
                  <VideoJS key={video._id} options={videoJsOptions} />
                </div>
              )}
            </div>
            <div
              className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
              role="button"
              tabindex="0"
            >
              <div className="flex flex-wrap gap-y-2">
                <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                  <h1 className="text-lg font-bold">{video.title}</h1>
                  <p className="flex text-sm text-gray-200">
                    {video.views} Views ·{" "}
                    {moment(`${video.createdAt}`).fromNow()}
                  </p>
                </div>

                <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                  <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                    <ToggleVideoLike
                      isAuthenticate={isAuthenticate}
                      videoId={video._id}
                      videoInfo={video}
                    />
                    <div className="relative block">
                      <Button
                        size="lg"
                        variant="secondary"
                        className="peer flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black"
                      >
                        <span className="inline-block w-5">
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
                              d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                            ></path>
                          </svg>
                        </span>
                        Save
                      </Button>
                      <div className="absolute right-0 top-full z-10 hidden w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30 hover:block peer-focus:block">
                        <h3 className="mb-4 text-center text-lg font-semibold">
                          Save to playlist
                        </h3>
                        <ul className="mb-4">
                          {channelPlayListData &&
                            channelPlayListData.map((playList) => (
                              <li className="mb-2 last:mb-0" key={playList._id}>
                                <label
                                  className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                  htmlFor={playList._id}
                                >
                                  <input
                                    type="checkbox"
                                    id={playList._id}
                                    onChange={(e) =>
                                      handleAddVideoToPlaylist(
                                        e.target.checked,
                                        playList._id
                                      )
                                    }
                                    className="peer hidden"
                                  />
                                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="3"
                                      stroke="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                      ></path>
                                    </svg>
                                  </span>
                                  {playList.name}
                                </label>
                              </li>
                            ))}
                        </ul>
                        <div className="flex flex-col">
                          <label
                            htmlFor="playlist-name"
                            className="mb-1 inline-block cursor-pointer"
                          >
                            Name
                          </label>
                          <input
                            className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-[#ae7aff]"
                            value={playListName}
                            placeholder="Enter playlist name"
                            onChange={(e) => {
                              const playlistName = e.target.value.trim();
                              if (playlistName !== "") {
                                setButtonDisabled(true);
                              }
                              setPlayListName(playlistName);
                            }}
                          />
                          <Button
                            size="lg"
                            variant="secondary"
                            className={`mx-auto mt-4 rounded-lg bg-orange-500 px-4 py-2 text-black ${
                              !buttonDisabled
                                ? "pointer-events-none"
                                : "pointer-events-auto"
                            }`}
                            disabled={!buttonDisabled}
                            onClick={handleAddNewPlaylist}
                          >
                            {!buttonDisabled ? "No Save" : "Save"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  {video?.owner && (
                    <div className="mt-2 h-12 w-12 shrink-0">
                      <img
                        src={video.owner.avatar}
                        alt="avatar"
                        className="h-full w-full rounded-full"
                      />
                    </div>
                  )}

                  <div className="block">
                    <p className="text-gray-200">{video.owner.userName}</p>
                    <p className="text-sm text-gray-400">757K Subscribers</p>
                  </div>
                </div>
                <div className="block">
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => handleToggleSubscription(video.owner._id)}
                    className="group/btn mr-1 flex w-full items-center gap-x-2 bg-orange-500 px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                  >
                    <span className="inline-block w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                        ></path>
                      </svg>
                    </span>
                    {isSubscribe ? "Subscribed" : "Subscribe"}
                  </Button>
                </div>
              </div>
              <hr className="my-4 border-white" />
              <div className="h-5 overflow-hidden group-focus:h-auto">
                <p className="text-sm">{video.description}</p>
              </div>
            </div>
            <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
              <h6 className="font-semibold">
                {videoComments?.length} Comments...
              </h6>
            </button>
            <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
              <div className="block">
                <h6 className="mb-4 font-semibold">
                  {videoComments?.length} Comments
                </h6>
                <input
                  type="text"
                  className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
                  placeholder="Add a Comment"
                  ref={inputRef}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? handleAddVideoComments(e) : ""
                  }
                />
              </div>
              <hr className="my-4 border-white" />
              {videoComments && videoComments?.length > 0 ? (
                <>
                  {videoComments.map((videoComment) => (
                    <div key={videoComment._id}>
                      <div className="flex gap-x-4">
                        <div className="mt-2 h-11 w-11 shrink-0">
                          <img
                            src={videoComment.owner.avatar}
                            alt={videoComment.owner.userName}
                            className="h-full w-full rounded-full"
                          />
                        </div>
                        <div className="block">
                          <p className="flex items-center text-gray-200">
                            {videoComment.owner.fullName}

                            <span className="text-sm ms-3">
                              {moment(`${videoComment.createdAt}`).fromNow()}
                            </span>
                          </p>
                          <p className="text-sm text-gray-200">
                            {videoComment.owner.userName}
                          </p>
                          <p className="mt-3 text-sm">{videoComment.content}</p>
                        </div>
                      </div>

                      <hr className="my-4 border-white" />
                    </div>
                  ))}
                </>
              ) : (
                <h1>no comments </h1>
              )}
            </div>
          </div>
          <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px] cursor-pointer">
            {videos.map((video) => (
              <Link
                to={`/watch/${video._id}`}
                replace
                onClick={() => handleWatchVideo(video._id)}
                state={{ videos: video }}
                key={video._id}
              >
                {isLoading ? (
                  <VideoSkeleton />
                ) : (
                  <div className="w-full gap-x-2 border pr-2 md:flex">
                    <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
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
                    {video?.owner && (
                      <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                        <div className="h-12 w-12 shrink-0 md:hidden">
                          <img
                            src={video.owner.avatar}
                            alt={video.owner.userName}
                            className="h-full w-full rounded-full"
                          />
                        </div>
                        <div className="w-full pt-1 md:pt-0">
                          <h6 className="mb-1 text-sm font-semibold">
                            {video.title}
                          </h6>
                          <p className="mb-0.5 mt-2 text-sm text-gray-200">
                            {video.owner.userName}
                          </p>
                          <p className="flex text-sm text-gray-200">
                            {video.view} Views ·{" "}
                            {moment(`${video.createdAt}`).fromNow()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
