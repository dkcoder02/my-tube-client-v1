import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { editIsActive } from "../../store/channelSlice";
import { Button } from "../ui/button";
function ChannelCard() {
  const channelInfo = useSelector((state) => state.channel.channelInfo);
  const dispatch = useDispatch();
  return (
    <>
      {channelInfo && channelInfo.length !== 0 ? (
        <>
          <div className="relative min-h-[150px] w-full pt-[16.28%]">
            <div className="absolute inset-0 overflow-hidden">
              <img src={channelInfo.coverImage} alt="cover-photo" />
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="flex flex-wrap gap-4 pb-4 pt-6">
              <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                <img
                  src={channelInfo.avatar}
                  alt="Channel"
                  className="h-full w-full"
                />
              </span>
              <div className="mr-auto inline-block">
                <h1 className="font-bolg text-xl">{channelInfo.fullName}</h1>
                <p className="text-sm text-gray-400">{channelInfo.userName}</p>
                <p className="text-sm text-gray-400">
                  {channelInfo.subscribersCount} Subscribers · 
                  {channelInfo.channelsSubscribedToCount} Subscribed
                </p>
              </div>
              <div className="inline-block">
                {/* <div className="inline-flex min-w-[145px] justify-end"> subscribe or subscribed  button code
              <button className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
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
                <span className="group-focus/btn:hidden">Subscribe</span>
                <span className="hidden group-focus/btn:block">Subscribed</span>
              </button>
            </div> */}
                <Link
                  to="/personal-info-edit"
                  onClick={() => dispatch(editIsActive(true))}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="group/btn mr-1 flex w-full items-center gap-x-2 bg-gray-400 hover:bg-orange-400 px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        ></path>
                      </svg>
                    </span>
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default ChannelCard;
