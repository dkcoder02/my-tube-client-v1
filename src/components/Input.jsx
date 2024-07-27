import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    label,
    labelClassName,
    type = "text",
    className = "",
    isViewPassword = false,
    setPasswordShown,
    passwordShown,
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className="relative inline-block w-full">
      {label && (
        <label
          className={labelClassName ? labelClassName : "inline-block mb-1 pl-1"}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50l ${className}`}
        ref={ref}
        {...props}
        id={id}
      />

      {isViewPassword && (
        <span
          onClick={() => setPasswordShown(!passwordShown)}
          className="absolute right-3 top-3/4 transform -translate-y-1/2 cursor-pointer"
        >
          {passwordShown ? (
            <EyeOpenIcon className="w-5 h-5 text-gray-700" />
          ) : (
            <EyeClosedIcon className="w-5 h-5 text-gray-700" />
          )}{" "}
        </span>
      )}
    </div>
  );
});

export default Input;
