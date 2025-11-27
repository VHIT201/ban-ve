import { useLocation, matchPath } from "react-router-dom";

const useMatchPath = () => {
  const { pathname } = useLocation();

  const handleMatchPath = (pattern: string | string[]) => {
    if (Array.isArray(pattern)) {
      return pattern.some((p) => matchPath({ path: p, end: false }, pathname));
    }
    return matchPath({ path: pattern, end: false }, pathname);
  };

  return handleMatchPath;
};

export default useMatchPath;
