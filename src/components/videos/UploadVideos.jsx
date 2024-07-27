import { useForm } from "react-hook-form";
import Input from "../Input";
import { useNavigate, Link } from "react-router-dom";
import videoService from "../../services/Video/video";
import { Button } from "../ui/button";
import { videoFileSchema } from "../../schemas/videoFileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export default function UploadVideos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(videoFileSchema),
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const videoUpload = async (data) => {
    try {
      const videoFile = data.videoFile[0];
      navigate("/uploading", {
        state: { videoInfo: videoFile, uploading: true },
      });

      await videoService
        .uploadVideo(data)
        .then((res) => {
          navigate("/uploading", {
            state: { videoInfo: videoFile, uploadStatus: true },
          });
        })
        .catch((error) =>
          navigate("/uploading", {
            state: { videoInfo: videoFile, uploadStatus: false },
          })
        );
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

  return (
    <>
      <div className="absolute inset-0 z-10 bg-black/50 px-4 pb-[86px] pt-4 sm:px-14 sm:py-8">
        <div className="h-full overflow-auto border bg-[#121212]">
          <form action="" onSubmit={handleSubmit(videoUpload)}>
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-xl font-semibold">Upload Videos</h2>
              <div className="flex items-end">
                <div className="me-3">
                  <Button
                    size="lg"
                    variant="outline"
                    type="submit"
                    className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-orange-500 px-4 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                  >
                    Save
                  </Button>
                </div>

                <Link to="/channel">
                  <button className="h-6 w-6 pb-8 ">
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
                </Link>
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-4 p-4">
              <div className="w-full border-2 border-dashed px-4 py-12 text-center">
                <span className="mb-4 inline-block w-24 rounded-full bg-orange-300 p-4 text-orange-500">
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
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    ></path>
                  </svg>
                </span>
                <h6 className="mb-2 font-semibold">
                  Drag and drop video files to upload
                </h6>
                <p className="text-gray-400">
                  Your videos will be private untill you publish them.
                </p>

                <Input
                  type="file"
                  label="Select Files"
                  labelClassName="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-orange-500 px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                  className="sr-only"
                  {...register("videoFile", { required: true })}
                />

                <span className="mt-2 text-red-500">
                  {errors.videoFile && errors.videoFile.message}
                </span>
              </div>
              <div className="w-full">
                <Input
                  type="file"
                  id="thumbnail"
                  label="Thumbnail*"
                  labelClassName="mb-1 inline-block"
                  className="w-full border p-1 file:mr-4 file:border-none file:bg-orange-500   file:px-3 file:py-1.5"
                  {...register("thumbnail", { required: true })}
                />

                <span className="mt-2 text-red-500">
                  {errors.thumbnail && errors.thumbnail.message}
                </span>
              </div>
              <div className="w-full">
                <Input
                  id="title"
                  label="Title*"
                  labelClassName="mb-1 inline-block"
                  className="w-full border bg-transparent px-2 py-1 outline-none"
                  {...register("title", { required: true })}
                />
                <span className="mt-2 text-red-500">
                  {errors.title && errors.title.message}
                </span>
              </div>
              <div className="w-full">
                <label htmlFor="desc" className="mb-1 inline-block">
                  Description
                  <sup>*</sup>
                </label>
                <textarea
                  id="desc"
                  className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"
                  {...register("description", { required: true })}
                ></textarea>

                <span className="mt-2 text-red-500">
                  {errors.description && errors.description.message}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
