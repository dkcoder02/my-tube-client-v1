import moment from "moment";
import { useEffect, useState } from "react";

function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(moment());
  useEffect(() => {
    const momentTime = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(momentTime);
  }, []);
  return currentTime;
}

export default useCurrentTime;
