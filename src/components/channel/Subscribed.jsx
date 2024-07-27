import { useEffect, useState } from "react";
import { SecondHeader, ChannelCard } from "../index";
import { useLoaderData } from "react-router-dom";
import videoService from "../../services/Video/video";
import authService from "../../services/Auth/auth";
import { ownChannelData } from "../../store/channelSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";

export default function Subscribed({ setProgress, progress }) {
  const channelInfo = useSelector((state) => state.channel.channelInfo);
  const allChannels = useLoaderData();
  const [channelsData, setChannelsData] = useState(allChannels.data);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const dispatch = useDispatch();

  const handleChannelSearchByUserName = (username) => {
    if (username && username !== "") {
      const filteredChannels = allChannels.data.filter((channel) =>
        channel.userName.toLowerCase().includes(username.toLowerCase())
      );
      setChannelsData(filteredChannels);
    } else {
      setChannelsData(allChannels.data);
    }
  };

  const fetchAllChannel = async () => {
    const channelsData = await videoService.getChannelList();
    setChannelsData(channelsData.data.data);
  };

  const handleToggleChannelSubscribe = async (channelId) => {
    try {
      setIsSubscribed(!isSubscribed);
      const res = await videoService.toggleSubscribe(channelId);
      setIsSubscribed(res.data.data.Subscribed);
      fetchAllChannel();
      const username = channelInfo.userName;
      if (username) {
        const channelProfile = await authService.channelProfile(username);
        dispatch(ownChannelData(channelProfile.data.data));
      }
    } catch (error) {
      console.log("error", error);
      setIsSubscribed(false);
    }
  };

  useEffect(() => {
    setProgress(progress + 40);
    setTimeout(() => {
      setProgress(progress + 100);
    }, 1200);
  }, []);

  return (
    <>
      <div className="px-4 pb-4">
        <ChannelCard />
        <SecondHeader />
        <div className="py-4">
          <div className="flex flex-col gap-y-4 py-4">
            <div className="relative mb-2 rounded-lg bg-white py-2 pl-8 pr-3 text-black">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
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
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  ></path>
                </svg>
              </span>
              <input
                className="w-full bg-transparent outline-none"
                placeholder="Search"
                onChange={(e) => handleChannelSearchByUserName(e.target.value)}
              />
            </div>
            {channelsData?.length !== 0 ? (
              channelsData?.map((channel) => (
                <div className="flex w-full justify-between" key={channel._id}>
                  <div className="flex items-center gap-x-2">
                    <div className="h-14 w-14 shrink-0">
                      <img
                        src={channel?.avatar}
                        alt={channel.userName}
                        className="h-full w-full rounded-full"
                      />
                    </div>
                    <div className="block">
                      <h6 className="font-semibold">{channel.userName}</h6>
                      <p className="text-sm text-gray-300">
                        {channel.subscribersCount} Subscribers
                      </p>
                    </div>
                  </div>
                  <div className="block" htmlFor={channel._id}>
                    <Button
                      size="lg"
                      variant="outline"
                      className={`px-4 py-2 rounded-lg  text-transform:cap ${
                        channel.isSubscribe
                          ? "bg-orange-500 text-white"
                          : "bg-white text-black"
                      } `}
                      onClick={() => handleToggleChannelSubscribe(channel._id)}
                    >
                      {channel.isSubscribe ? "Subscribed" : "Subscribe"}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-white">No Channels Found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
