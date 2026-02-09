import { BellIcon, FigmaIcon, Telescope } from "lucide-react";

export const apps = [
  {
    name: "Telegram",
    logo: <Telescope />,
    connected: false,
    desc: "Connect with Telegram for real-time communication.",
  },
  {
    name: "Notion",
    logo: <BellIcon />,
    connected: true,
    desc: "Effortlessly sync Notion pages for seamless collaboration.",
  },
  {
    name: "Figma",
    logo: <FigmaIcon />,
    connected: true,
    desc: "View and collaborate on Figma designs in one place.",
  },
];
