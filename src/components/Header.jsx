import { Link, useNavigate } from "react-router-dom";
import authService from "../services/Auth/auth";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const { toast } = useToast();
  const isEditPersonalInfo = useSelector(
    (state) => state.channel.isEditPersonalInfo
  );
  let loggedInUser = JSON.parse(localStorage.getItem("user"));

  const authStatus = loggedInUser?._id ? true : false;
  const authInfo = loggedInUser;
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      const logoutUser = await authService.logout();
      if (logoutUser) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: "",
          })
        );
        toast({
          title: "Goodbye!",
          description: "Logout successfully!",
          className:
            "bg-orange-500 border border-orange-300 text-black text-3xl font-semibold",
          duration: 1000,
        });
      }
      navigate("/");
    } catch (error) {
      const msg = error.response.data.msg || error.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: msg.toUpperCase(),
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  useEffect(() => {
    loggedInUser = JSON.parse(localStorage.getItem("user"));
  }, [isEditPersonalInfo]);

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white bg-[#121212] px-4">
        <nav className="mx-auto flex max-w-7xl items-center py-2">
          <div className="mr-4 w-12 shrink-0 sm:w-16">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                id="videoplayer"
              >
                <path
                  fill="#ecb665"
                  d="M88.21,10.63H11.79A5.84,5.84,0,0,0,6,16.46v43a5.84,5.84,0,0,0,5.83,5.84H88.21A5.84,5.84,0,0,0,94,59.5v-43A5.84,5.84,0,0,0,88.21,10.63ZM63.48,41.39,39.29,52.82a3.24,3.24,0,0,1-1.39.31,3.28,3.28,0,0,1-1.73-.5,3.23,3.23,0,0,1-1.5-2.74V26.07a3.2,3.2,0,0,1,1.55-2.76,3.27,3.27,0,0,1,1.69-.48,3.19,3.19,0,0,1,1.47.36L63.57,35.58a3.24,3.24,0,0,1-.09,5.81Z"
                  className="colorec6568 svgShape"
                ></path>
                <path
                  fill="#333333"
                  d="M88.21,7.67H11.79A8.8,8.8,0,0,0,3,16.46v43a8.8,8.8,0,0,0,8.79,8.8H88.21A8.8,8.8,0,0,0,97,59.5v-43A8.8,8.8,0,0,0,88.21,7.67ZM94,59.5a5.84,5.84,0,0,1-5.83,5.84H11.79A5.84,5.84,0,0,1,6,59.5v-43a5.84,5.84,0,0,1,5.83-5.83H88.21A5.84,5.84,0,0,1,94,16.46Z"
                  className="color333333 svgShape"
                ></path>
                <path
                  fill="#f69c16"
                  d="M62.22,38.22,38,25.82a.3.3,0,0,0-.12,0,.46.46,0,0,0-.15,0,.26.26,0,0,0-.13.24V49.89a.25.25,0,0,0,.13.24.22.22,0,0,0,.26,0L62.21,38.71c.08,0,.16-.07.16-.25A.22.22,0,0,0,62.22,38.22Z"
                  className="colorfecb37 svgShape"
                ></path>
                <path
                  fill="#333333"
                  d="M63.57,35.58,39.38,23.19a3.19,3.19,0,0,0-1.47-.36,3.27,3.27,0,0,0-1.69.48,3.2,3.2,0,0,0-1.55,2.76V49.89a3.23,3.23,0,0,0,1.5,2.74,3.28,3.28,0,0,0,1.73.5,3.24,3.24,0,0,0,1.39-.31L63.48,41.39a3.24,3.24,0,0,0,.09-5.81Zm-1.36,3.13L38,50.14a.22.22,0,0,1-.26,0,.25.25,0,0,1-.13-.24V26.07a.26.26,0,0,1,.13-.24.46.46,0,0,1,.15,0,.3.3,0,0,1,.12,0l24.19,12.4a.22.22,0,0,1,.15.24C62.37,38.64,62.29,38.68,62.21,38.71Z"
                  className="color333333 svgShape"
                ></path>
                <path
                  fill="#ecb665"
                  d="M21.81,73.06H20.39a3.15,3.15,0,0,0-3.14,3.14v10a3.15,3.15,0,0,0,3.14,3.16h1.42A3.16,3.16,0,0,0,25,86.21v-10A3.15,3.15,0,0,0,21.81,73.06Z"
                  className="colorec6568 svgShape"
                ></path>
                <path
                  fill="#333333"
                  d="M27.92,76.2a6.12,6.12,0,0,0-6.11-6.11H20.39a6.13,6.13,0,0,0-6.11,6.11v3.53H7.49v3h6.79v3.52a6.12,6.12,0,0,0,6.11,6.12h1.42a6.12,6.12,0,0,0,6.11-6.12V82.69H92.51v-3H27.92Zm-3,10a3.16,3.16,0,0,1-3.15,3.16H20.39a3.15,3.15,0,0,1-3.14-3.16v-10a3.15,3.15,0,0,1,3.14-3.14h1.42A3.15,3.15,0,0,1,25,76.2Z"
                  className="color333333 svgShape"
                ></path>
              </svg>
            </Link>
          </div>
          <div className="relative mx-auto hidden w-full max-w-md overflow-hidden sm:block">
            <input
              className="w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2"
              placeholder="Search"
            />
            <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                ></path>
              </svg>
            </span>
          </div>
          <button className="ml-auto sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </button>
          <button className="group peer ml-4 flex w-6 shrink-0 flex-wrap gap-y-1.5 sm:hidden">
            <span className="block h-[2px] w-full bg-white group-hover:bg-orange-300"></span>
            <span className="block h-[2px] w-2/3 bg-white group-hover:bg-orange-300"></span>
            <span className="block h-[2px] w-full bg-white group-hover:bg-orange-300"></span>
          </button>
          <div className="fixed inset-y-0 right-0 flex w-full max-w-xs shrink-0 translate-x-full flex-col border-l border-white bg-[#121212] duration-200 hover:translate-x-0 peer-focus:translate-x-0 sm:static sm:ml-4 sm:w-auto sm:translate-x-0 sm:border-none">
            <div className="relative flex w-full items-center justify-between border-b border-white px-4 py-2 sm:hidden">
              <Link to="/">
                <span className="inline-block w-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    id="videoplayer"
                  >
                    <path
                      fill="#ecb665"
                      d="M88.21,10.63H11.79A5.84,5.84,0,0,0,6,16.46v43a5.84,5.84,0,0,0,5.83,5.84H88.21A5.84,5.84,0,0,0,94,59.5v-43A5.84,5.84,0,0,0,88.21,10.63ZM63.48,41.39,39.29,52.82a3.24,3.24,0,0,1-1.39.31,3.28,3.28,0,0,1-1.73-.5,3.23,3.23,0,0,1-1.5-2.74V26.07a3.2,3.2,0,0,1,1.55-2.76,3.27,3.27,0,0,1,1.69-.48,3.19,3.19,0,0,1,1.47.36L63.57,35.58a3.24,3.24,0,0,1-.09,5.81Z"
                      className="colorec6568 svgShape"
                    ></path>
                    <path
                      fill="#333333"
                      d="M88.21,7.67H11.79A8.8,8.8,0,0,0,3,16.46v43a8.8,8.8,0,0,0,8.79,8.8H88.21A8.8,8.8,0,0,0,97,59.5v-43A8.8,8.8,0,0,0,88.21,7.67ZM94,59.5a5.84,5.84,0,0,1-5.83,5.84H11.79A5.84,5.84,0,0,1,6,59.5v-43a5.84,5.84,0,0,1,5.83-5.83H88.21A5.84,5.84,0,0,1,94,16.46Z"
                      className="color333333 svgShape"
                    ></path>
                    <path
                      fill="#f69c16"
                      d="M62.22,38.22,38,25.82a.3.3,0,0,0-.12,0,.46.46,0,0,0-.15,0,.26.26,0,0,0-.13.24V49.89a.25.25,0,0,0,.13.24.22.22,0,0,0,.26,0L62.21,38.71c.08,0,.16-.07.16-.25A.22.22,0,0,0,62.22,38.22Z"
                      className="colorfecb37 svgShape"
                    ></path>
                    <path
                      fill="#333333"
                      d="M63.57,35.58,39.38,23.19a3.19,3.19,0,0,0-1.47-.36,3.27,3.27,0,0,0-1.69.48,3.2,3.2,0,0,0-1.55,2.76V49.89a3.23,3.23,0,0,0,1.5,2.74,3.28,3.28,0,0,0,1.73.5,3.24,3.24,0,0,0,1.39-.31L63.48,41.39a3.24,3.24,0,0,0,.09-5.81Zm-1.36,3.13L38,50.14a.22.22,0,0,1-.26,0,.25.25,0,0,1-.13-.24V26.07a.26.26,0,0,1,.13-.24.46.46,0,0,1,.15,0,.3.3,0,0,1,.12,0l24.19,12.4a.22.22,0,0,1,.15.24C62.37,38.64,62.29,38.68,62.21,38.71Z"
                      className="color333333 svgShape"
                    ></path>
                    <path
                      fill="#ecb665"
                      d="M21.81,73.06H20.39a3.15,3.15,0,0,0-3.14,3.14v10a3.15,3.15,0,0,0,3.14,3.16h1.42A3.16,3.16,0,0,0,25,86.21v-10A3.15,3.15,0,0,0,21.81,73.06Z"
                      className="colorec6568 svgShape"
                    ></path>
                    <path
                      fill="#333333"
                      d="M27.92,76.2a6.12,6.12,0,0,0-6.11-6.11H20.39a6.13,6.13,0,0,0-6.11,6.11v3.53H7.49v3h6.79v3.52a6.12,6.12,0,0,0,6.11,6.12h1.42a6.12,6.12,0,0,0,6.11-6.12V82.69H92.51v-3H27.92Zm-3,10a3.16,3.16,0,0,1-3.15,3.16H20.39a3.15,3.15,0,0,1-3.14-3.16v-10a3.15,3.15,0,0,1,3.14-3.14h1.42A3.15,3.15,0,0,1,25,76.2Z"
                      className="color333333 svgShape"
                    ></path>
                  </svg>
                </span>
              </Link>
              <button className="inline-block w-8">
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
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
            </div>
            <ul className="my-4 flex w-full flex-wrap gap-2 px-4 sm:hidden">
              <li className="w-full">
                <Link to="/">
                  <button className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#e9bb65] hover:text-black focus:border-[#e9bb65] focus:bg-[#e9bb65]focus:text-black">
                    <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                      <svg
                        style={{ width: "100%" }}
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 15.9997H14M9.0177 1.76375L2.23539 7.03888C1.78202 7.3915 1.55534 7.56781 1.39203 7.78861C1.24737 7.9842 1.1396 8.20454 1.07403 8.43881C1 8.70327 1 8.99045 1 9.56481V16.7997C1 17.9198 1 18.4799 1.21799 18.9077C1.40973 19.284 1.71569 19.59 2.09202 19.7818C2.51984 19.9997 3.07989 19.9997 4.2 19.9997H15.8C16.9201 19.9997 17.4802 19.9997 17.908 19.7818C18.2843 19.59 18.5903 19.284 18.782 18.9077C19 18.4799 19 17.9198 19 16.7997V9.56481C19 8.99045 19 8.70327 18.926 8.43881C18.8604 8.20454 18.7526 7.9842 18.608 7.78861C18.4447 7.56781 18.218 7.3915 17.7646 7.03888L10.9823 1.76376C10.631 1.4905 10.4553 1.35388 10.2613 1.30136C10.0902 1.25502 9.9098 1.25502 9.73865 1.30136C9.54468 1.35388 9.36902 1.4905 9.0177 1.76375Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <span>Home</span>
                  </button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="/likes">
                  <button className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#e9bb65] hover:text-black focus:border-[#e9bb65] focus:bg-[#e9bb65]focus:text-black">
                    <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                      <svg
                        style={{ width: "100%" }}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 21V10M1 12V19C1 20.1046 1.89543 21 3 21H16.4262C17.907 21 19.1662 19.9197 19.3914 18.4562L20.4683 11.4562C20.7479 9.6389 19.3418 8 17.5032 8H14C13.4477 8 13 7.55228 13 7V3.46584C13 2.10399 11.896 1 10.5342 1C10.2093 1 9.91498 1.1913 9.78306 1.48812L6.26394 9.40614C6.10344 9.76727 5.74532 10 5.35013 10H3C1.89543 10 1 10.8954 1 12Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <span>Liked Videos</span>
                  </button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="/history">
                  <button className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#e9bb65] hover:text-black focus:border-[#e9bb65] focus:bg-[#e9bb65]focus:text-black">
                    <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                      <svg
                        style={{ width: "100%" }}
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.7 11.5L18.7005 9.5L16.7 11.5M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C13.3019 1 16.1885 2.77814 17.7545 5.42909M10 5V10L13 12"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <span>History</span>
                  </button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="/my/studio">
                  <button className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#e9bb65] hover:text-black focus:border-[#e9bb65] focus:bg-[#e9bb65]focus:text-black">
                    <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                      <svg
                        style={{ width: "100%" }}
                        viewBox="0 0 22 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 4.93137C21 4.32555 21 4.02265 20.8802 3.88238C20.7763 3.76068 20.6203 3.69609 20.4608 3.70865C20.2769 3.72312 20.0627 3.93731 19.6343 4.36569L16 8L19.6343 11.6343C20.0627 12.0627 20.2769 12.2769 20.4608 12.2914C20.6203 12.3039 20.7763 12.2393 20.8802 12.1176C21 11.9774 21 11.6744 21 11.0686V4.93137Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H11.2C12.8802 1 13.7202 1 14.362 1.32698C14.9265 1.6146 15.3854 2.07354 15.673 2.63803C16 3.27976 16 4.11984 16 5.8V10.2C16 11.8802 16 12.7202 15.673 13.362C15.3854 13.9265 14.9265 14.3854 14.362 14.673C13.7202 15 12.8802 15 11.2 15H5.8C4.11984 15 3.27976 15 2.63803 14.673C2.07354 14.3854 1.6146 13.9265 1.32698 13.362C1 12.7202 1 11.8802 1 10.2V5.8Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <span>My Content</span>
                  </button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="/playlist">
                  <button className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#e9bb65] hover:text-black focus:border-[#e9bb65] focus:bg-[#e9bb65]focus:text-black">
                    <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                      <svg
                        className=""
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="0.8"
                          d="M19 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Zm0 0-4 4m5 0H4m1 0 4-4m1 4 4-4m-4 7v6l4-3-4-3Z"
                        />
                      </svg>
                    </span>
                    <span>Playlist</span>
                  </button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="/channel">
                  <button className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#e9bb65] hover:text-black focus:border-[#e9bb65] focus:bg-[#e9bb65]focus:text-black">
                    <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                      <svg
                        style={{ width: "100%" }}
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 13.5H6.5C5.10444 13.5 4.40665 13.5 3.83886 13.6722C2.56045 14.06 1.56004 15.0605 1.17224 16.3389C1 16.9067 1 17.6044 1 19M15 16L17 18L21 14M13.5 5.5C13.5 7.98528 11.4853 10 9 10C6.51472 10 4.5 7.98528 4.5 5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <span>My Channel</span>
                  </button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="https://mytube-feedback.vercel.app/">
                  <button className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#e9bb65] hover:text-black focus:border-[#e9bb65] focus:bg-[#e9bb65]focus:text-black">
                    <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                      <svg
                        style={{ width: "100%" }}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.09 8C8.3251 7.33167 8.78915 6.76811 9.39995 6.40913C10.0108 6.05016 10.7289 5.91894 11.4272 6.03871C12.1255 6.15849 12.7588 6.52152 13.2151 7.06353C13.6713 7.60553 13.9211 8.29152 13.92 9C13.92 11 10.92 12 10.92 12M11 16H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <span>Feed Back</span>
                  </button>
                </Link>
              </li>
              {/* <li className="hidden sm:block mt-auto">
                <Link to="https://mytube-feedback.vercel.app/">
                  <button className="flex flex-col items-center justify-center border-white py-1  focus:text-[#e9bb65] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#e9bb65] sm:hover:text-black sm:focus:border-[#e9bb65] sm:focus:bg-[#e9bb65] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4">
                    <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                      <svg
                        style={{ width: "100%" }}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.09 8C8.3251 7.33167 8.78915 6.76811 9.39995 6.40913C10.0108 6.05016 10.7289 5.91894 11.4272 6.03871C12.1255 6.15849 12.7588 6.52152 13.2151 7.06353C13.6713 7.60553 13.9211 8.29152 13.92 9C13.92 11 10.92 12 10.92 12M11 16H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <span className={`block sm:hidden sm:group-hover:inline`}>
                      Feed Back
                    </span>
                  </button>
                </Link>
              </li> */}
            </ul>
            <div className="mb-8 mt-auto flex w-full flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
              {!authStatus ? (
                <>
                  {" "}
                  <Link to="/login">
                    <Button
                      variant="destructive"
                      size="lg"
                      className="w-full bg-[#383737] px-3 py-2 hover:bg-[#474747] sm:w-auto sm:bg-transparent"
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button
                      variant="outline"
                      size="lg"
                      className="mr-1 w-full bg-orange-500 px-3 py-2 text-center font-bold text-white shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <button className="flex w-full gap-4 text-left sm:items-center">
                    <img
                      src={authInfo?.avatar}
                      alt="avatar logo"
                      className="h-16 w-16 shrink-0 rounded-full sm:h-12 sm:w-12"
                    />
                    <div className="w-full pt-2 sm:hidden">
                      <h6 className="font-semibold">{authInfo?.fullName}</h6>
                      <p className="text-sm text-gray-300">
                        @{authInfo?.userName}
                      </p>
                    </div>
                    <Button
                      onClick={signOut}
                      variant="outline"
                      size="lg"
                      className=" w-full mr-1 bg-orange-500 px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                    >
                      Sign Out
                    </Button>
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
