import { cn } from "@/utils/ui";
import "./RouteHydrateFallbackElement.css";

const RouterHydrateFallbackElement = () => {
  // Template
  return (
    <div
      className={cn(
        "flex h-screen w-screen items-center justify-center p-4",
        "bg-white/80 backdrop-blur-sm dark:bg-gray-900/80",
      )}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative">
          {/* Background effect */}
          <div
            className={cn(
              "text-primary absolute inset-0 animate-ping rounded-full opacity-10",
            )}
          />
          <svg
            className="loader"
            width="240"
            height="240"
            viewBox="0 0 240 240"
          >
            <circle
              className="loader-ring loader-ring-a"
              cx="120"
              cy="120"
              r="105"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 660"
              strokeDashoffset="-330"
              strokeLinecap="round"
            ></circle>
            <circle
              className="loader-ring loader-ring-b"
              cx="120"
              cy="120"
              r="35"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 220"
              strokeDashoffset="-110"
              strokeLinecap="round"
            ></circle>
            <circle
              className="loader-ring loader-ring-c"
              cx="85"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 440"
              strokeLinecap="round"
            ></circle>
            <circle
              className="loader-ring loader-ring-d"
              cx="155"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 440"
              strokeLinecap="round"
            ></circle>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RouterHydrateFallbackElement;
