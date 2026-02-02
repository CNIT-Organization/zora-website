import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop() {
  const { pathname } = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = setTimeout(() => setIsNavigating(false), 100);
    return () => clearTimeout(timer);
  }, [pathname]);
}
