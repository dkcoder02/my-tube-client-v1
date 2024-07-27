import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import authService from "./services/Auth/auth";

export default function App() {
  useEffect(() => {
    (async () => {
      const userInfo = await authService.getCurrentUser();
      const loggedInUser = localStorage.getItem("user");

      if (userInfo && !loggedInUser) {
        localStorage.setItem("user", JSON.stringify(userInfo.data.data));
        return;
      }

      if (!userInfo) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: "",
          })
        );
      }
    })();
  }, []);

  return (
    <>
      <div className="text-white">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
