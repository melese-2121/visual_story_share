import { Outlet, useNavigate } from "react-router-dom";
import LeftSideBar from "../components/shared/LeftSideBar";
import TopBar from "../components/shared/TopBar";
import BottomBar from "../components/shared/BottomBar";
import { useUserContext } from "../context/AuthContext";

const RootLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserContext();

  if (!isAuthenticated) navigate("/sign-in");

  return (
    <section className="h-screen  w-screen scroll-dsplay-none md:flex ">
      <TopBar />
      <section className="flex justify-between  w-screen h-full">
        <LeftSideBar />
        <Outlet />
      </section>
      <BottomBar />
    </section>
  );
};

export default RootLayout;
