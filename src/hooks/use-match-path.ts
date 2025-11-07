import { useLocation, matchPath } from "react-router-dom";

const useMatchPath = (pattern: string | string[]) => {
  const { pathname } = useLocation();

  if (Array.isArray(pattern)) {
    return pattern.some((p) => matchPath({ path: p, end: false }, pathname));
  }

  return !!matchPath({ path: pattern, end: false }, pathname);
};

export default useMatchPath;
