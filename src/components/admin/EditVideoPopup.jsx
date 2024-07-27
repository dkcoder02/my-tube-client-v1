import React, { useState } from "react";
import videoService from "../../services/Video/video";
import { Button } from "../ui/button";

function EditVideoPopup({ setEditVideoModelActive, video, setReload, reload }) {
  const [title, setTitle] = useState(video?.title);
  const [description, setDescription] = useState(video?.description);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUploadVideoThumbnail = async ({ videoId, thumbnail }) => {
    try {
      setLoading(true);
      const videoThumbnail = await videoService.changeUploadVideoThumbnail({
        videoId,
        thumbnail,
      });

      if (videoThumbnail && videoThumbnail.data.success === true) {
        setReload(!reload);
        setEditVideoModelActive(false);
      }
    } catch (error) {
      console.log("upload video thubmail", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateVideoDetails = async () => {
    setLoading(true);
    try {
      if (!title) setTitleError(true);

      if (!description) setDescriptionError(true);

      const videoId = video._id;
      const videoResponse = await videoService.updateVideoDetails({
        videoId,
        title,
        description,
      });
      if (videoResponse && videoResponse.data.success === true) {
        setReload(!reload);
        setEditVideoModelActive(false);
      }
    } catch (error) {
      console.log("update video details error", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="w-16 h-16 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 top-[calc(66px)] z-10 flex flex-col bg-black/50 px-4 pb-[86px] pt-4 sm:top-[calc(82px)] sm:px-14 sm:py-8">
        <div className="mx-auto w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
          <div className="mb-4 flex items-start justify-between">
            <h2 className="text-xl font-semibold">
              Edit Video
              <span className="block text-sm text-gray-300">
                Share where you&#x27;ve worked on your profile.
              </span>
            </h2>
            <button
              className="h-6 w-6"
              onClick={() => setEditVideoModelActive(false)}
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
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <label htmlFor="thumbnail" className="mb-1 inline-block">
            Thumbnail
            <sup>*</sup>
          </label>
          <label
            className="relative mb-4 block cursor-pointer border border-dashed p-2 after:absolute after:inset-0 after:bg-transparent hover:after:bg-black/10"
            htmlFor="thumbnail"
          >
            <input
              type="file"
              className="sr-only"
              id="thumbnail"
              onChange={(e) =>
                handleUploadVideoThumbnail({
                  videoId: video._id,
                  thumbnail: e.target.files[0],
                })
              }
            />
            <img src={video?.thumbnail[0]?.url} alt={video?.title} />
          </label>
          <div className="mb-6 flex flex-col gap-y-4">
            <div className="w-full">
              <label htmlFor="title" className="mb-1 inline-block">
                Title
                <sup>*</sup>
              </label>
              <input
                id="title"
                type="text"
                className="w-full border bg-transparent px-2 py-1 outline-none"
                onChange={(e) => {
                  setTitle(e.target.value);
                  e.target.value ? setTitleError(false) : setTitleError(true);
                }}
                defaultValue={title}
                required={true}
              />
              {titleError && (
                <span className="text-red-500 text-lg ">Title is required</span>
              )}
            </div>
            <div class="w-full">
              <label htmlFor="desc" class="mb-1 inline-block">
                Description
                <sup>*</sup>
              </label>
              <textarea
                id="desc"
                className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"
                required={true}
                onChange={(e) => {
                  e.target.value
                    ? setDescriptionError(false)
                    : setDescriptionError(true);
                  setDescription(e.target.value);
                }}
              >
                {description}
              </textarea>
              {descriptionError && (
                <span className="text-red-500 text-lg ">
                  Description is required
                </span>
              )}
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="border px-4 py-3"
              onClick={() => setEditVideoModelActive(false)}
            >
              Cancel
            </Button>
            <Button
              size="lg"
              className="bg-orange-500 px-4 py-3  text-black hover:text-white"
              onClick={handleUpdateVideoDetails}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditVideoPopup;
