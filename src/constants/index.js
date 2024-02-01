import { BiHome } from "react-icons/bi";
import { BiNews } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BiSave } from "react-icons/bi";
import { BiUpload } from "react-icons/bi";

export const sidebarLinks = [
  { icon: BiNews, route: "/explore", label: "Explore" },
  { icon: BiUser, route: "/all-users", label: "People" },
  { icon: BiHome, route: "/", label: "Home" },
  { icon: BiSave, route: "/saved", label: "Saved" },
  { icon: BiUpload, route: "/post", label: "Create" },
];
