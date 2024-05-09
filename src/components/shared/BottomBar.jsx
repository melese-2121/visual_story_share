import React from "react";
import { sidebarLinks } from "../../constants";
import { Link, useLocation } from "react-router-dom";

const BottmBar = () => {
  const { pathname } = useLocation();
  return (
    <nav className="sm:hidden bottom-bar bg-white bg-opacity-100 rounded-t-md -pb-1 fixed bg-fixed">
      <ul className="w-full flex justify-around items-center">
        {sidebarLinks.map((link) => {
          return (
            <Link to={link.route} key={link.route}>
              <li
                key={link.label}
                className={` hover:bg-[#6d1ef7] duration-500 p-1 ml-1 hover:rounded-md  hover:cursor-pointer 
                 my-1 ${
                   link.route === "/" ? "px-4 rounded-md py-3 mx-1" : "px-2"
                 } ${pathname === link.route ? "bg-[#630ff5] rounded-md" : ""}`}
              >
                <link.icon
                  className={`text-center text-teal-800 ${
                    link.route === "/"
                      ? "h-7 w-7 text-black"
                      : "w-full px-2 pb-1 h-6 "
                  }`}
                />
                <p
                  className={`font-serif ${
                    link.route === "/" ? "hidden" : "block"
                  } text-xs font-serif text-zinc-800 `}
                >
                  {link.label}
                </p>
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottmBar;
