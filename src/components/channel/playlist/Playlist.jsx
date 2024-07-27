import { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import videoService from "../../../services/Video/video";
import ChannelCard from "../../cards/ChannelCard";
import SecondHeader from "../../SecondHeader";

export default function Playlist({ setProgress, progress }) {
  const authInfo = JSON.parse(localStorage.getItem("user"));
  const [playListVideos, setPlayListVideos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setProgress(progress + 30);
        const channelPlayListVideos =
          await videoService.getVideoPlaylistByUserId(authInfo._id);
        setProgress(progress + 50);
        if (channelPlayListVideos && channelPlayListVideos.status === 200) {
          setPlayListVideos(channelPlayListVideos.data.data);
        }
      } catch (error) {
        console.log("Error::", error);
      } finally {
        setTimeout(() => {
          setProgress(progress + 100);
        }, 1200);
      }
    })();
  }, []);

  return (
    <>
      <ChannelCard />
      <SecondHeader />
      <div className="grid gap-4 pt-2 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]">
        {playListVideos && playListVideos.length !== 0 ? (
          playListVideos.map(
            (playList) =>
              playList.videos.length !== 0 && (
                <Link
                  to={`/playlist-videos/${playList._id}/${authInfo._id}`}
                  state={{ channelPlaylist: playList }}
                >
                  <div className="w-full cursor-pointer" key={playList._id}>
                    <div className="relative mb-2 w-full pt-[56%]">
                      <div className="absolute inset-0">
                        <img
                          src={playList.videos[0]?.thumbnail[0]?.url}
                          alt={playList.name}
                          className="h-full w-full"
                        />
                        <div className="absolute inset-x-0 bottom-0">
                          <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                            <div className="relative z-[1]">
                              <p className="flex justify-between">
                                <span className="inline-block">Playlist</span>
                                <span className="inline-block">
                                  {playList.videos.length} videos
                                </span>
                              </p>
                              <p className="text-sm text-gray-200">
                                {/* 100K Views · {" "} */}
                                {moment(`${playList.createdAt}`).fromNow()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h6 className="mb-1 font-semibold">{playList.name}</h6>
                    <p className="flex text-sm text-gray-200">
                      {playList?.description || ""}
                    </p>
                  </div>
                </Link>
              )
          )
        ) : (
          <p className="text-center justify-center mt-20  text-gray-300 text-3xl hover:text-orange-400">
            No Playlist
          </p>
        )}
      </div>
    </>
  );
}
