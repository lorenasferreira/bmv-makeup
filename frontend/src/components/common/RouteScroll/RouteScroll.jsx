import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function RouteScroll() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      let id = hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        // A malformed fragment must not prevent the page from rendering.
      }
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

export default RouteScroll;
