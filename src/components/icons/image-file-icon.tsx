import { FC, HTMLAttributes } from "react";
import imageFile from "@/assets/image/icon/image.png";

interface Props extends HTMLAttributes<HTMLImageElement> {}

const ImageFileIcon: FC<Props> = (props) => {
  return <img src={imageFile.src} alt="Image file Icon" {...props} />;
};

export default ImageFileIcon;
