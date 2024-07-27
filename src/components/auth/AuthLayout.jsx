import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const authStatus = loggedInUser._id ? true : false;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [authStatus, authentication, navigate]);
  return loading ? <h1>Loading...</h1> : <>{children}</>;
}
