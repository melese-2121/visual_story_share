import { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

import { logo } from "../../assets/images";
import { useSignInAccount } from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";

const TopBar = () => {
  const { mutate: signOut, isPending: isSignOutSuccessfull } =
    useSignInAccount();
  const { user, setIsAuthenticated, setUser, INITIAL_USER } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSignOutSuccessfull) {
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      navigate("/sign-in");
    }
  }, [isSignOutSuccessfull]);

  const handleProfilePicClick = () => {
    console.log("Profile image clicked");
    return;
  };

  return (
    <nav className="topbar bg-white sm:hidden flex justify-between items-center px-4 py-2 rounded-b-sm transition-opacity ">
      <Link to="/">
        <div className="flex justify-center items-center gap-1">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <h2 className="font-serif text-cyan-400 font-bold text-xl max-xs:hidden">
            VSS
          </h2>
        </div>
      </Link>
      <div className="flex justify-end gap-3 ">
        <Link onClick={() => signOut()}>
          <BiLogOut className="w-8 h-8 text-cyan-400 hover: cursor-pointer hover:text-cyan-600" />
        </Link>
        <Link
          onClick={() => {
            handleProfilePicClick();
          }}
        >
          {user.imgUrl ? (
            <img
              src={user.imgUrl}
              alt="Logout"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <CgProfile className="w-8 h-8 text-zinc-500 hover:text-zinc-600" />
          )}
        </Link>
      </div>
    </nav>
  );
};

export default TopBar;
