import { useEffect } from "react";

const useVersionCheck = () => {
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetch("/version.json", { cache: "no-store" });
        const { version } = await res.json();

        const localVersion = localStorage.getItem("app_version");
        if (localVersion && localVersion !== version) {
          localStorage.setItem("app_version", version);
          window.location.reload();
        } else {
          localStorage.setItem("app_version", version);
        }
      } catch (err) {
        console.error("Version check failed:", err);
      }
    };

    checkVersion();
    const interval = setInterval(checkVersion, 5000);
    return () => clearInterval(interval);
  }, []);
};

export default useVersionCheck;
