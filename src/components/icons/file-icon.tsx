import { FC, HTMLAttributes } from "react";
import excel48SVG from "@/assets/svg/file-48.svg";
import excel96SVG from "@/assets/svg/file-96.svg";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props extends HTMLAttributes<HTMLImageElement> {}

const ExcelFileIcon: FC<Props> = (props) => {
  const isMobile = useIsMobile();

  return (
    <img
      src={isMobile ? excel48SVG?.src : excel96SVG?.src}
      alt="File Icon"
      {...props}
    />
  );
};

export default ExcelFileIcon;
