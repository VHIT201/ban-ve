import { FC, HTMLAttributes } from "react";
import pdf94Png from "@/assets/image/icon/pdf-94.png";

interface Props extends HTMLAttributes<HTMLImageElement> {}

const PdfFileIcon: FC<Props> = (props) => {
  return <img src={pdf94Png} alt="PDF File Icon" {...props} />;
};

export default PdfFileIcon;
