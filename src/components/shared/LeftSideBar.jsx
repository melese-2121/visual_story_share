import React, { useState } from "react";
import { logo } from "../../assets/images";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { useSignInAccount } from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";
import { sidebarLinks } from "../../constants";

const LeftSideBar = () => {
  const { mutate: signOut, isSuccess: isSignOutSuccessfull } =
    useSignInAccount();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isSignOutSuccessfull) navigate(0);
  }, [isSignOutSuccessfull]);

  const handleMouseOver = () => {
    setShowText(true);
  };
  const handleMouseLeave = () => {
    setShowText(false);
  };
  return (
    <nav
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className="left-sidebar-containero max-sm:hidden overflow-hidden bg-[#823ef7] h-full  w-20 hover:w-[240px] z-50 fixed duration-500"
    >
      <Link to="/">
        <div className="flex justify-center items-center gap-1 pt-2 mb-20  ">
          <img src={logo} alt="Logo" className="h-10 " />
          {/* <h2 className="text-xl text-[#823ef7] font-bold font-inter max-xs:hidden">
            Visual Story Share
          </h2> */}
        </div>
      </Link>
      <ul className="grid  justify-center left-0  gap-4">
        {sidebarLinks.map((link) => {
          return (
            <Link to={link.route} key={link.route} className="w-full ">
              <li
                key={link.label}
                className={`flex  hover:bg-[rgb(236,233,240)]  rounded-[3px] hover:rounded-[3px] gap-3 hover:cursor-pointer   pl-8 pr-4 py-2  ${
                  pathname === link.route ? "" : ""
                }`}
              >
                <link.icon
                  className={`w-7 h-7 ml-16   ${
                    pathname === link.route ? "text-white" : ""
                  } `}
                />
                <p
                  className={`mt-1 pl-5 inset-0 z-20  text-zinc-700 font-bold ${
                    pathname === link.route ? "text-white" : ""
                  } `}
                >
                  {link.label}
                </p>
              </li>
            </Link>
          );
        })}
      </ul>
      <div
        onClick={() => signOut()}
        className="flex justify-center items-center pt-24 gap-2 hover:cursor-pointer"
      >
        {/* <BiLogOut className="w-10 h-10  -ml-5 hover:text-cyan-600" /> */}
        <p className="font-bold hover:border py-1 px-5 border-[#823ef7] duration-500 hover:bg-red  rounded-md font-serif text-lg text-white">
          Logout
        </p>
      </div>
    </nav>
  );
};

export default LeftSideBar;
