import React from "react";
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

  useEffect(() => {
    if (isSignOutSuccessfull) navigate(0);
  }, [isSignOutSuccessfull]);

  return (
    <nav className="left-sidebar-container">
      <Link to="/">
        <div className="flex justify-center items-center gap-1 mb-20  ">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <h2 className="font-serif text-lg text-orange-800 font-bold max-xs:hidden">
            Visual Story Share
          </h2>
        </div>
      </Link>
      <ul className="grid  justify-center items-center gap-4">
        {sidebarLinks.map((link) => {
          return (
            <Link to={link.route} key={link.route}>
              <li
                key={link.label}
                className={`flex flex-1  hover:bg-teal-400 rounded-md hover:rounded-md gap-3 hover:cursor-pointer max-md:px-9 px-16 lg:px-20 py-2 -ml-2 ${
                  pathname === link.route ? "bg-teal-400" : ""
                }`}
              >
                <link.icon
                  className={`w-7 h-8 -ml-2 ${
                    pathname === link.route ? "text-white" : "text-teal-400"
                  }`}
                />
                <p className="mt-1 font-serif text-zinc-700 font-bold">
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
        <BiLogOut className="w-10 h-10 text-orange-700 -ml-5 hover:text-cyan-600" />
        <p className="font-bold font-serif text-lg text-zinc-900">ከአካዉንት ዉጣ</p>
      </div>
    </nav>
  );
};

export default LeftSideBar;
