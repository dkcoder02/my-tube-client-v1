import React, { useEffect, useState } from "react";
import SecondHeader from "./SecondHeader";
import { useDispatch, useSelector } from "react-redux";
import authService from "../services/Auth/auth.js";
import { useForm } from "react-hook-form";
import { Input } from "../components/index.js";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button.jsx";
import { editPersonalInfo } from "../store/channelSlice.js";

function EditPersonalInfo() {
  const [error, setError] = useState("");
  const [authInfo, setAuthInfo] = useState("");
  const [isAuthInfoChange, setIsAuthInfoChange] = useState(false);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuthDataInLocalStorage = async (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setIsAuthInfoChange(!isAuthInfoChange);
  };

  const onProfileUpdate = async (data) => {
    setError("");
    try {
      const updatedProfile = await authService.updateUserProfile(data);
      if (updatedProfile) {
        const user = await authService.getCurrentUser();
        if (user) {
          handleAuthDataInLocalStorage(user.data.data);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const coverImageUpload = async (e) => {
    setError("");
    try {
      const coverImageFile = e.target.files;
      if (coverImageFile) {
        const uploadCoverImage = await authService.changeCoverImage(
          coverImageFile
        );

        if (uploadCoverImage) {
          const user = await authService.getCurrentUser();
          if (user) {
            dispatch(editPersonalInfo(true));
            handleAuthDataInLocalStorage(user.data.data);
          }
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const avatarImageUpload = async (e) => {
    setError("");
    try {
      const avatarImageFile = e.target.files;
      if (avatarImageFile) {
        const uploadAvatarImage = await authService.changeAvatar(
          avatarImageFile
        );

        if (uploadAvatarImage) {
          const user = await authService.getCurrentUser();
          if (user) {
            dispatch(editPersonalInfo(true));
            handleAuthDataInLocalStorage(user.data.data);
          }
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("user"));
    setAuthInfo(response);
  }, [isAuthInfoChange]);

  if (error) {
    return <h2 className="text-red-500 text-center">{error}</h2>;
  }
  return (
    <>
      {authInfo && authInfo.length !== 0 ? (
        <>
          <div className="relative min-h-[150px] w-full pt-[16.28%]">
            <div className="absolute inset-0 overflow-hidden">
              {authInfo.coverImage !== "" ? (
                <img src={authInfo.coverImage} alt="cover-photo" />
              ) : (
                ""
              )}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <input
                type="file"
                id="cover-image"
                className="hidden"
                onInput={(e) => coverImageUpload(e)}
              />

              <label
                htmlFor="cover-image"
                className="inline-block h-10 w-10 cursor-pointer rounded-lg bg-white/60 p-1 text-orange-500 hover:bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  ></path>
                </svg>
              </label>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="flex flex-wrap gap-4 pb-4 pt-6">
              <div className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                <img
                  src={authInfo.avatar}
                  alt="Channel avatar"
                  className="h-full w-full"
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    onInput={(e) => avatarImageUpload(e)}
                  />
                  <label
                    htmlFor="profile-image"
                    className="inline-block h-8 w-8 cursor-pointer rounded-lg bg-white/60 p-1 text-orange-500 hover:bg-white"
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
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      ></path>
                    </svg>
                  </label>
                </div>
              </div>
              <div className="mr-auto inline-block">
                <h1 className="font-bolg text-xl">{authInfo.fullName}</h1>
                <p className="text-sm text-gray-400">{authInfo.userName}</p>
              </div>
              <div className="inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="group/btn mr-1 flex w-full text-transform: uppercase items-center gap-x-2 bg-orange-500 px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                >
                  View channel
                </Button>
              </div>
            </div>
            <SecondHeader />
            <div className="flex flex-wrap justify-center gap-y-4 py-4">
              <div className="w-full sm:w-1/2 lg:w-1/3">
                <h5 className="font-semibold">Personal Info</h5>
                <p className="text-gray-300">
                  Update your photo and personal details.
                </p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-2/3">
                <form action="" onSubmit={handleSubmit(onProfileUpdate)}>
                  <div className="rounded-lg border">
                    <div className="flex flex-wrap gap-y-4 p-4">
                      <div className="w-full lg:w-1/2 lg:pr-2">
                        <Input
                          label="Full Name"
                          placeholder="Enter your full name"
                          defaultValue={authInfo.fullName}
                          {...register("fullName", {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="w-full lg:w-1/2 lg:pl-2">
                        <Input
                          label="User Name"
                          placeholder="Enter your user name"
                          defaultValue={authInfo.userName}
                          {...register("userName", {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="w-full">
                        <div className="relative">
                          <Input
                            type="email"
                            placeholder="Email"
                            id="email"
                            label=" Email address"
                            defaultValue={authInfo.email}
                            {...register("email", {
                              required: true,
                              validate: {
                                matchPatern: (value) =>
                                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                    value
                                  ) || "Email address must be a valid address",
                              },
                            })}
                          />
                          {/* <div className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300">
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
                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                              ></path>
                            </svg>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <hr className="border border-gray-300" />
                    <div className="flex items-center justify-end gap-4 p-4">
                      <Button
                        size="lg"
                        type="button"
                        onClick={() => navigate("/channel")}
                        className="inline-block rounded-lg border text-transform: uppercase px-3 py-1.5 hover:bg-white/10"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        type="submit"
                        className="inline-block bg-orange-500 text-transform: uppercase px-3 py-1.5 text-black"
                      >
                        Save changes
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default EditPersonalInfo;
