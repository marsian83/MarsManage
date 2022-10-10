import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Logout() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
    window.location = "/"
  });
  return <>{}</>;
}
