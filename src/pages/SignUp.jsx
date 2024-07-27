import { useEffect, useState } from "react";
import { Signup as SignUpPage } from "../components";
import LoadingBar from "react-top-loading-bar";

export default function SignUp() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(progress + 40);
    setTimeout(() => {
      setProgress(progress + 100);
    }, 1200);
  }, []);

  return (
    <div>
      <LoadingBar
        height={2}
        color={"#2998ff"}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <SignUpPage />
    </div>
  );
}
