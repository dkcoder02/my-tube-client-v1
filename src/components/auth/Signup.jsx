import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpSchema } from "../../schemas/signupSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "../index.js";
import authService from "../../services/Auth/auth.js";
import { Button } from "../ui/button.jsx";
import { ReloadIcon } from "@radix-ui/react-icons";

function Signup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (data) => {
    setIsSubmitting(true);
    try {
      const userAccount = await authService.createAccount(data);
      navigate("/");
      if (userAccount) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser)
          localStorage.setItem("user", JSON.stringify(currentUser.data.data));
      }
      toast({
        title: "Welcome",
        description: "Account created successfully!",
        className:
          "bg-orange-500 border border-orange-300 text-black text-3xl font-semibold",
        duration: 1000,
      });
    } catch (error) {
      const msg = error.response.data.msg || error.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: msg.toUpperCase(),
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      <div className="mx-auto my-8 flex w-full max-w-sm flex-col px-4">
        <div className="mx-auto inline-block w-16">
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
        </div>
        <div className="mb-6 w-full text-center text-2xl font-semibold uppercase">
          Signup
        </div>
        <form onSubmit={handleSubmit(handleSignup)} className="mt-1">
          <div className="space-y-5">
            <Input
              label="Full Name *"
              placeholder="Enter your full name"
              {...register("fullName", {
                required: true,
              })}
            />

            <span className="text-red-500">
              {errors.fullName && errors.fullName.message}
            </span>

            <Input
              label="User Name *"
              placeholder="User Name"
              {...register("userName", { required: true, maxLength: 10 })}
            />

            <span className="text-red-500">
              {errors.userName && errors.userName.message}
            </span>

            <Input
              label="Avatar *"
              type="file"
              {...register("avatar", { required: true })}
            />
            <span className="text-red-500">
              {errors.avatar && errors.avatar.message}
            </span>
            <Input
              type="email"
              placeholder="Email"
              id="email"
              label="Email *"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <span className="text-red-500">
              {errors.email && errors.email.message}
            </span>

            <Input
              label="Password: "
              type={passwordShown ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
              isViewPassword={true}
              setPasswordShown={setPasswordShown}
              passwordShown={passwordShown}
            />
            <span className="text-red-500">
              {errors.password && errors.password.message}
            </span>
            <div>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-md bg-orange-500  hover:bg-orange-400 px-3.5 py-2.5 font-semibold leading-7 text-white"
              >
                {isSubmitting ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
            <div>
              <Link to="/">
                <Button
                  size="lg"
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#252525] px-3.5 py-2.5 font-semibold leading-7 text-white"
                >
                  Go Back
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
