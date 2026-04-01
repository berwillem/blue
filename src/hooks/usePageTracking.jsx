import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    window.gtag("config", "G-R4K8M8MN1Z", {
      page_path: location.pathname,
    });
  }, [location]);
}

export default usePageTracking;
