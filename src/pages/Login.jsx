import { useEffect, useState } from "react";
import { Login as LoginPage } from "../components/index.js";
import LoadingBar from "react-top-loading-bar";

export default function Login() {
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
      <LoginPage />
    </div>
  );
}
