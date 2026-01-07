import { FC, HTMLAttributes } from "react";
import excel48SVG from "@/assets/svg/excel-48.svg";
import excel96SVG from "@/assets/svg/excel-96.svg";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props extends HTMLAttributes<HTMLImageElement> {}

const ExcelFileIcon: FC<Props> = (props) => {
  const isMobile = useIsMobile();

  return (
    <img
      src={isMobile ? excel48SVG : excel96SVG}
      alt="Excel File Icon"
      {...props}
    />
  );
};

export default ExcelFileIcon;
