import { Outlet, useNavigate } from "react-router-dom";
import LeftSideBar from "../components/shared/LeftSideBar";
import TopBar from "../components/shared/TopBar";
import BottomBar from "../components/shared/BottomBar";
import { useUserContext } from "../context/AuthContext";
import Post from "./Pages/Post";

const RootLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserContext();

  if (!isAuthenticated) navigate("/sign-in");

  return (
    <section className="h-screen overflow-hidden   w-screen scroll-dsplay-none md:flex ">
      <TopBar />
      <section className="flex justify-between w-screen h-full">
        <LeftSideBar />
        <section className="lg:pl-20 max-lg:px-3 mx-auto overflow-scroll">
          <Outlet />
        </section>
        <section className="max-w-[600px] hidden lg:block overflow-scroll">
          <Post />
        </section>
      </section>
      <BottomBar />
    </section>
  );
};

export default RootLayout;
