import React, { useEffect, useState } from "react";
import {
  SecondHeader,
  ChannelCard,
  MyChannelEmptyTweetCard,
} from "../../index";
import AddTweet from "./AddTweet";
import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";
import videoService from "../../../services/Video/video";
import moment from "moment";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Tweets({ setProgress, progress }) {
  const response = useLoaderData();
  const { userId } = useParams();
  const [channelTweet, setChannelTweets] = useState(response.data);
  const [tweetId, setTweetId] = useState("");
  const { register, setValue, watch } = useForm();
  const tweet = watch("content");
  const { toast } = useToast();

  const handleChannelTweet = async () => {
    try {
      const content = tweet.trim();

      if (content) {
        const response = await videoService.createTweet({ content });
        setTweetId(response.data.data._id);
        setValue("content", "");
        toast({
          description: "Tweet added successfully!",
          className:
            "bg-orange-500 border border-orange-300 text-black text-3xl font-semibold",
          duration: 1500,
        });
      }
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

  useEffect(() => {
    (async () => {
      setProgress(progress + 30);
      const response = await videoService.getUserTweets(userId);
      if (response) {
        setChannelTweets(response.data.data);
        setProgress(progress + 50);
      }
      setTimeout(() => {
        setProgress(progress + 100);
      }, 1200);
    })();
  }, [tweetId]);

  return (
    <>
      <div className="px-4 pb-4">
        <ChannelCard />
        <SecondHeader />
        <AddTweet register={register} handleChannelTweet={handleChannelTweet} />
        <div className="py-4">
          {channelTweet && channelTweet.length !== 0 ? (
            channelTweet.map((tweet) => (
              <div
                key={tweet._id}
                className="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent"
              >
                <div className="h-14 w-14 shrink-0">
                  <img
                    src={tweet.owner.avatar}
                    alt={tweet.owner.userName}
                    className="h-full w-full rounded-full"
                  />
                </div>
                <div className="w-full">
                  <h4 className="mb-1 flex items-center gap-x-2">
                    <span className="font-semibold">
                      {tweet.owner.userName}
                    </span>
                     
                    <span className="inline-block text-sm text-gray-400">
                      {moment(`${tweet.createdAt}`).fromNow()}
                    </span>
                  </h4>
                  <p className="mb-2">{tweet.content}</p>

                  {/* Tweet Like and Dislike 
                  <div className="flex gap-4">
                    <button
                      className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]"
                      data-like-count="425"
                      data-like-count-alt="424"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5 text-[#ae7aff] group-focus:text-inherit"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-dislike-count)] focus:after:content-[attr(data-dislike-count-alt)]"
                      data-dislike-count="87"
                      data-dislike-count-alt="88"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5 text-inherit group-focus:text-[#ae7aff]"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                        ></path>
                      </svg>
                    </button>
                  </div> 
                  */}
                </div>
              </div>
            ))
          ) : (
            <MyChannelEmptyTweetCard />
          )}
        </div>
      </div>
    </>
  );
}
