import { SecondHeader, Input } from "../index.js";
import { useForm } from "react-hook-form";
import authService from "../../services/Auth/auth.js";
import { ToastAction } from "@radix-ui/react-toast";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button.jsx";

function ChangePassword() {
  const authInfo = JSON.parse(localStorage.getItem("user"));
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const ChangePasswordHandle = async (data) => {
    try {
      const user = await authService.changePassword(data);
      if (user) {
        toast({
          description: "Change password successfully",
          className:
            "bg-orange-500 border border-orange-300 text-black text-3xl font-semibold",
          duration: 1000,
        });
      }
      navigate("/");
    } catch (error) {
      const msg = error.response?.data.msg || error?.message;
      console.log("error", error);
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
      {" "}
      {authInfo && authInfo.length !== 0 ? (
        <>
          <div className="relative min-h-[150px] w-full pt-[16.28%]">
            <div className="absolute inset-0 overflow-hidden">
              <img src={authInfo.coverImage || ""} alt="cover-photo" />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 pb-4 pt-6">
            <div className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
              <img
                src={authInfo.avatar}
                alt="Channel"
                className="h-full w-full"
              />
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
        </>
      ) : null}
      <div className="px-4 pb-4">
        <SecondHeader />
        <div className="flex flex-wrap justify-center gap-y-4 py-4">
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <h5 className="font-semibold">Password</h5>
            <p className="text-gray-300">
              Please enter your current password to change your password.
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-2/3">
            <div className="rounded-lg border">
              <form action="" onSubmit={handleSubmit(ChangePasswordHandle)}>
                <div className="flex flex-wrap gap-y-4 p-4">
                  <div className="w-full">
                    <Input
                      label="Current Password: "
                      type="password"
                      placeholder="Enter your current password"
                      {...register("oldPassword", {
                        required: true,
                      })}
                    />

                    <span className="text-red-500">
                      {errors.oldPassword && errors.oldPassword.message}
                    </span>
                  </div>
                  <div className="w-full">
                    <Input
                      label="New Password: "
                      type="password"
                      placeholder="New password"
                      {...register("newPassword", {
                        required: true,
                      })}
                    />
                    <p className="mt-0.5 text-sm text-gray-300">
                      Your new password must be more than 8 characters.
                    </p>
                    <span className="text-red-500">
                      {errors.newPassword && errors.newPassword.message}
                    </span>
                  </div>
                  <div className="w-full">
                    <Input
                      label="Confirm password: "
                      type="password"
                      placeholder="Confirm password"
                      {...register("confirmPassword", {
                        required: true,
                      })}
                    />
                    <span className="text-red-500">
                      {errors.confirmPassword && errors.confirmPassword.message}
                    </span>
                  </div>
                </div>
                <hr className="border border-gray-300" />
                <div className="flex items-center justify-end gap-4  p-4">
                  <Button
                    size="lg"
                    type="button"
                    onClick={() => reset()}
                    className="inline-block rounded-lg border text-transform: uppercase px-3 py-1.5 hover:bg-white/10"
                  >
                    Clear
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    type="submit"
                    className="inline-block text-transform: uppercase  bg-orange-500 px-3 py-1.5 text-black"
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
