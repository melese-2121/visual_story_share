import { Outlet, Navigate } from "react-router-dom";
import { people } from "../assets/images";

const AuthLayout = () => {
  let isUserIsLogedIn = false;
  return (
    <div>
      {isUserIsLogedIn ? (
        <Navigate to="/" />
      ) : (
        <div className="flex flex-1">
          <section className="lg:w-1/2 max-lg:mx-14 mx-md:mx-8 max-sm:mx-2 w-full">
            <Outlet />
          </section>
          <img
            src={people}
            alt="people logo"
            className="w-1/2 object-cover h-screen hidden lg:block flex-1 "
          />
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
